exports.action = (data)=>{

var fs = require('fs');var d = fs.readFileSync('C:\\JarvisIA\\NodeJS\\programming.json', 'utf8');
var objet = JSON.parse(d);var longueur = objet.length;var jsonStr = JSON.stringify(objet)
var phrasedomo=JarvisIA.reco
var m="device";

console.log(phrasedomo,' reco ')
for(var i=0;i<objet.length;i++){
    var t=objet[i]['name']
    t=t.trim()
    if(phrasedomo.search(new RegExp(t,"gi"))>-1){var result=i;console.log("result = "+i)}
}

if(result ===undefined){console.log('rien'); return false}

const TuyAPI = require('tuyapi');

var device = new TuyAPI({
  id: objet[result]['id'],
    key: objet[result]['key']});

device.find().then(() => {console.log('find device!');
  // Connect to device
  device.connect();
});

// Add event listeners
device.on('connected', () => {
  console.log('Connected to device!');
});

device.on('disconnected', () => {
  console.log('Disconnected from device.');
});

device.on('error', error => {
  console.log('Error!', error);device.disconnect();
});

//setTimeout(() => { device.disconnect(); }, 10000);
device.on('data', dat => {
 (async () => { console.log('Data from device:', dat);

//if(dat.dps['1']!==undefined){ dataDPSonoff='1'}else{ dataDPSonoff='20'}
//if(dat.dps['2']!==undefined){ dataDPScolour='2'}else{ dataDPScolour='21'}
//if(dat.dps['5']!==undefined){ dataDPSrvb='5'}else{ dataDPSrvb='24'}

if(dat.dps['5']!==undefined){ red='ff01000000ffff'; green='23ff00006fffff'; blue='01001c00f3fe19'}else{ red='000003e803e8'; green='007803e803e8'; blue='00f003e803e8'}

//console.log(dataDPSonoff)
//console.log(dat.dps['1'],dat.dps[1])
//console.log(dataDPSrvb,'rrrrrrrrrrrrrr')
//dataDPSrvb='5'
    
    if((phrasedomo.search(new RegExp("vert","gi"))>-1)&&(dat.dps['1']!==undefined)){await device.set({multiple: true,data: {'1': true,'2' : 'colour' , '5': green}}).then(() => console.log("device was green")); device.disconnect();return false};
    if((phrasedomo.search(new RegExp("vert","gi"))>-1)&&(dat.dps['1']==undefined)){await device.set({multiple: true,data: {'20': true,'21' : 'colour' , '24': green}}).then(() => console.log("device was green")); device.disconnect();return false};
    
    if((phrasedomo.search(new RegExp("rouge","gi"))>-1)&&(dat.dps['1']!==undefined)){await device.set({multiple: true,data: {'1': true,'2' : 'colour' , '5': red}}).then(() => console.log("device was red")); device.disconnect();return false};
    if((phrasedomo.search(new RegExp("rouge","gi"))>-1)&&(dat.dps['1']==undefined)){await device.set({multiple: true,data: {'20': true,'21' : 'colour' , '24': red}}).then(() => console.log("device was red")); device.disconnect();return false};
    
    if((phrasedomo.search(new RegExp("bleu","gi"))>-1)&&(dat.dps['1']!==undefined)){await device.set({multiple: true,data: {'1': true,'2' : 'colour' , '5': blue}}).then(() => console.log("device blue")); device.disconnect();return false};
    if((phrasedomo.search(new RegExp("bleu","gi"))>-1)&&(dat.dps['1']==undefined)){await device.set({multiple: true,data: {'20': true,'21' : 'colour' , '24': blue}}).then(() => console.log("device blue")); device.disconnect();return false};
    
    if((phrasedomo.search(new RegExp("blanc","gi"))>-1)&&(dat.dps['1']!==undefined)){await device.set({multiple: true,data: {'1': true,'2' : 'white'}}).then(() => console.log("device was white")); device.disconnect();return false};
    if((phrasedomo.search(new RegExp("blanc","gi"))>-1)&&(dat.dps['1']==undefined)){await device.set({multiple: true,data: {'20': true,'21' : 'white'}}).then(() => console.log("device was white")); device.disconnect();return false};
    
    if((data.verifdomo=="on")&&(dat.dps['1']!==undefined)){console.log("onnnnnnnnn");await device.set({dps: '1', set: true}); device.disconnect();return false}
    if((data.verifdomo=="on")&&(dat.dps['1']==undefined)){console.log("onnnnnnnnn");await device.set({dps: '20', set: true}); device.disconnect();return false}
    
    if((data.verifdomo=="off")&&(dat.dps['1']!==undefined)){console.log("offffffffffffff");await device.set({dps: '1', set: false}); device.disconnect();return false} 
    if((data.verifdomo=="off")&&(dat.dps['1']==undefined)){console.log("offffffffffffff");await device.set({dps: '20', set: false}); device.disconnect();return false} 

device.disconnect()

})();


  //console.log(`Boolean status of default property: ${data.dps['1']}.`);

  // Set default property to opposite
  
});
}