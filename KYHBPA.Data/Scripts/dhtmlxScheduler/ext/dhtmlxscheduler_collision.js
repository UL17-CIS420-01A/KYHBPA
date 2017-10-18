/*
@license
dhtmlxScheduler.Net v.3.4.0 Professional Evaluation

This software is covered by DHTMLX Evaluation License. Contact sales@dhtmlx.com to get Commercial or Enterprise license. Usage without proper license is prohibited.

(c) Dinamenta, UAB.
*/
Scheduler.plugin(function(e){!function(){function t(t){var i=e._get_section_view();i&&t&&(a=e.getEvent(t)[e._get_section_property()])}var a,i;e.config.collision_limit=1,e.attachEvent("onBeforeDrag",function(e){return t(e),!0}),e.attachEvent("onBeforeLightbox",function(a){var n=e.getEvent(a);return i=[n.start_date,n.end_date],t(a),!0}),e.attachEvent("onEventChanged",function(t){if(!t||!e.getEvent(t))return!0;var a=e.getEvent(t);if(!e.checkCollision(a)){if(!i)return!1;a.start_date=i[0],a.end_date=i[1],
a._timed=this.isOneDayEvent(a)}return!0}),e.attachEvent("onBeforeEventChanged",function(t,a,i){return e.checkCollision(t)}),e.attachEvent("onEventAdded",function(t,a){var i=e.checkCollision(a);i||e.deleteEvent(t)}),e.attachEvent("onEventSave",function(t,a,i){if(a=e._lame_clone(a),a.id=t,!a.start_date||!a.end_date){var n=e.getEvent(t);a.start_date=new Date(n.start_date),a.end_date=new Date(n.end_date)}return a.rec_type&&e._roll_back_dates(a),e.checkCollision(a)}),e._check_sections_collision=function(t,a){
var i=e._get_section_property();return t[i]==a[i]&&t.id!=a.id?!0:!1},e.checkCollision=function(t){var i=[],n=e.config.collision_limit;if(t.rec_type)for(var r=e.getRecDates(t),s=0;s<r.length;s++)for(var o=e.getEvents(r[s].start_date,r[s].end_date),d=0;d<o.length;d++)(o[d].event_pid||o[d].id)!=t.id&&i.push(o[d]);else{i=e.getEvents(t.start_date,t.end_date);for(var l=0;l<i.length;l++)if(i[l].id==t.id){i.splice(l,1);break}}var _=e._get_section_view(),c=e._get_section_property(),h=!0;if(_){for(var u=0,l=0;l<i.length;l++)i[l].id!=t.id&&this._check_sections_collision(i[l],t)&&u++;
u>=n&&(h=!1)}else i.length>=n&&(h=!1);if(!h){var g=!e.callEvent("onEventCollision",[t,i]);return g||(t[c]=a||t[c]),g}return h}}()});