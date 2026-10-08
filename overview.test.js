import test from 'node:test';
import assert from 'node:assert/strict';
import {overview} from './overview.js';
const account={city:'New York',distance:'50 miles',intent:'Marriage',email:true,modules:[{id:'profile',page:'My profile',completed:true},{id:'preferences',page:'Preferences',completed:true}]};
test('completed modules have no completion reminder or obsolete overview controls',()=>{
 const html=overview(account);
 assert.doesNotMatch(html,/module-reminder|You’re all set|No introduction just yet|What happens next|Match updates/);
 assert.match(html,/We’ll let you know when a match is ready/);
 assert.match(html,/https:\/\/www.keeper.ai\/faqs#matching-time/);
});
test('unfinished modules show their count and lead to the first unfinished module',()=>{
 const html=overview({...account,modules:[account.modules[0],{...account.modules[1],completed:false}]});
 assert.match(html,/1 module left/);
 assert.match(html,/data-page="Preferences">Finish your modules/);
 const two=overview({...account,modules:account.modules.map(module=>({...module,completed:false}))});
 assert.match(two,/2 modules left/);
 assert.match(two,/data-page="My profile">Finish your modules/);
});
test('info and preferences open their editing fields and escape saved text',()=>{
 const html=overview({...account,socialLife:'<script>bad</script>',preferenceTerms:'Sociable, Reads books'});
 assert.match(html,/data-page="My profile" data-field="socialLife"/);
 assert.match(html,/data-page="Preferences" data-field="preferenceTerms"/);
 assert.match(html,/&lt;script&gt;bad&lt;\/script&gt;/);
 assert.doesNotMatch(html,/<script>/);
});
test('photo widgets use the correct links and an illustration, without rating controls',()=>{
 const html=overview(account);
 assert.match(html,/https:\/\/app.keeper.ai\/photos\/rate/);
 assert.match(html,/href="https:\/\/app.keeper.ai\/photos"/);
 assert.match(html,/What’s your best photo/);
 assert.match(html,/keeper-woman-illustration.png/);
 assert.doesNotMatch(html,/type="radio"|rating-options|rate-portrait|Kindle reader/);
});
test('paused searches and disabled notifications do not promise a notification',()=>{
 assert.match(overview({...account,paused:true}),/Your search is paused/);
 assert.doesNotMatch(overview({...account,email:false,sms:false}),/We’ll let you know/);
});

test('section arrows open the correct Keeper pages and demo preferences have variety',()=>{
 const html=overview(account);
 assert.match(html,/href="https:\/\/app.keeper.ai\/traits"[^>]*aria-label="Open My info on Keeper"/);
 assert.match(html,/href="https:\/\/app.keeper.ai\/preferences"[^>]*aria-label="Open Preferences on Keeper"/);
 assert.match(html,/Family-minded/);
 assert.match(html,/Curious/);
});

test('embedded navigation, uniform preferences and photo upload prompt is present',()=>{
 const html=overview(account);
 assert.doesNotMatch(html,/Love at first match/);
 assert.match(html,/Keeper website links/);
 assert.match(html,/https:\/\/www.keeper.ai\/about/);
 assert.match(html,/Health conscious/);
 assert.doesNotMatch(html,/priority-high|priority-medium|priority-low|Higher priority/);
 for(const path of ['matchmaker-comparison','dating-app-comparison','photo-testing','calc','love-letters','labs']) assert.ok(html.includes(`https://www.keeper.ai/${path}`));
 assert.match(html,/mailto:contact@keeper.ai/);
 assert.match(html,/tel:\+19172038737/);
 assert.match(html,/https:\/\/app.keeper.ai\/signup/);
 assert.match(html,/https:\/\/www.youtube.com\/@keeperMatch/);
 assert.match(html,/Upload your first image/);
 assert.doesNotMatch(html,/>Active<|Main navigation/);
});

test('waiting status replaces the redundant heading and zero-ready total',()=>{
 const html=overview(account);
 assert.doesNotMatch(html,/Your matchmaking|Ready to review/);
 assert.match(html,/4,185<\/span><span class="figure-label">Awaiting their answers/);
 assert.ok(html.indexOf('Keeper website links')<html.indexOf('aria-label="Settings"'));
});

test('waiting explanation is inline and photo actions link directly to Keeper',()=>{
 const html=overview(account);
 assert.doesNotMatch(html,/id="numbers"|View explanation|Love at first match/);
 assert.match(html,/<p class="status-explanation">These potential fits need to answer more questions/);
 assert.match(html,/class="photo-heading" href="https:\/\/app.keeper.ai\/photos\/rate"/);
 assert.match(html,/class="photo-heading" href="https:\/\/app.keeper.ai\/photos"/);
});

test('status popup has an explicit trigger and section icons live in the menu bar',()=>{
 const html=overview(account);
 assert.match(html,/<button id="match-explanation"[^>]*>What this means<\/button>/);
 assert.match(html,/class="panel-navigation"/);
 assert.doesNotMatch(html,/class="section-heading-button"[^>]*><svg|class="photo-heading"[^>]*><svg/);
});

test('photo widgets retain heading arrows and simplified attraction insights',()=>{
 const html=overview(account);
 assert.doesNotMatch(html,/widget-action|widget-link|photo-visibility|Who sees my photos|· Demo/);
 assert.match(html,/photo-heading-arrow/);
 assert.match(html,/<h3>Your type<\/h3>/);
 assert.match(html,/Sharp jawline • Indian ethnicity/);
});

test('best photo distinguishes missing uploads, pending feedback and real feedback',()=>{
 assert.match(overview(account),/Upload your first image/);
 const pending=overview({...account,uploadedPhotoCount:1});
 assert.doesNotMatch(pending,/Upload your first image/);
 assert.match(pending,/Your image is ready for testing/);
 const result=overview({...account,uploadedPhotoCount:1,photoFeedback:{summary:'Warm light helps; background distracts.',strengths:['Natural smile','Clear face'],weaknesses:['Simplify background','Improve lighting','Use a wider frame']}});
 assert.match(result,/Warm light helps; background distracts/);
 assert.match(result,/Natural smile • Clear face/);
 assert.match(result,/Simplify background • Improve lighting • Use a wider frame/);
 assert.match(result,/id="good-photo"/);
});

test('photo strengths and weaknesses belong only to the best-photo section',()=>{
 const html=overview({...account,uploadedPhotoCount:1,photoFeedback:{summary:'Sample result',strengths:['Natural smile'],weaknesses:['Softer lighting']}});
 const rate=html.slice(html.indexOf('class="attraction-widget rate-preview"'),html.indexOf('class="attraction-widget best-photo"'));
 assert.doesNotMatch(rate,/Strengths|Weaknesses/);
 const best=html.slice(html.indexOf('class="attraction-widget best-photo"'));
 assert.match(best,/Strengths/);assert.match(best,/Weaknesses/);
});
