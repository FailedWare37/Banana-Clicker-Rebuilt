        var banana = 0;
var clicker = {
    bananas:0,
    upgrades: {
        banana_monkey:{
            amount:0,
            cost:15,
            bps:0.1,
            name:"Monkey"
        },
        banana_farm:{
            amount:0,
            cost:100,
            bps:0.5,
            name:"Banana Farm"
        },
        banana_factory:{
            amount:0,
            cost:1000,
            bps:1,
            name:"Banana Factory"
        },
        banana_ship:{
            amount:0,
            cost:2500,
            bps:2.3,
            name:"Banana Shipment"
        },
        banana_bank:{
            amount:0,
            cost:5500,
            bps:4.5,
            name:"Banana Bank"
        },
        banana_satalite:{
            amount:0,
            cost:6500,
            bps:5.5,
            name:"Banana Satalite"
        },
        banana_void:{
            amount:0,
            cost:9500,
            bps:6.3,
            name:"Banana Void"
        },
        banana_console:{
            amount:0,
            cost:15000,
            bps:8.5,
            name:"Banana Console"
        },
        banana_jesus:{
            amount:0,
            cost:25000,
            bps:9.5,
            name:"Banana Jesus"
        },
        banana_15bps:{
            amount:0,
            cost:35000,
            bps:15.5,
            name:"This bad boy will give you 15 bps"
        }
    },
    badges:[
        {req:"clicker.bananas>0",gotten:false,text:"Have a Banana, get a banana"},
        {req:"clicker.bananas>9",gotten:false,text:"The Start, get 10 bananas."},
        {req:"clicker.bananas>49",gotten:false,text:"Getting somewhere, get 50 bananas."},
        {req:"clicker.bananas>99",gotten:false,text:"Somewhere, get 100 bananas."},
        {req:"clicker.bananas>999",gotten:false,text:"Banana enjoyer, get 1000 bananas."},
        {req:"clicker.bananas>9999",gotten:false,text:"you know nothing's going to save, get 10000 bananas."},
        {req:"clicker.bananas>99999",gotten:false,text:"Go outside, get 100000 bananas"},
        {req:"clicker.bananas>999999",gotten:false,text:"You're going bananas, get 1000000 bananas."}
    ]
};
var delay = 0;
function thing_clicked(thing){
    if(clicker.upgrades[thing].cost <= clicker.bananas){
    clicker.bananas-= clicker.upgrades[thing].cost;
    clicker.upgrades[thing].amount++
    clicker.upgrades[thing].cost +=Math.round(clicker.upgrades[thing].cost*0.20)
    update_upgrades();
     }
}
function update_upgrades(){
    document.querySelector("#upgrades").innerHTML="";
    for(i in clicker.upgrades){
        document.querySelector("#upgrades").innerHTML+= `<br> <button onclick="thing_clicked('${i}')">${clicker.upgrades
        [i].name}</button> you have ${clicker.upgrades[i].amount}. Cost: ${clicker.upgrades[i].cost}`;
    }
}
function updatecount(){
    
    if(Cookies.get("clicker") != null && Cookies.get("clicker") != "undefined"){
        var Clicker1 = JSON.parse(Cookies.get("clicker"));
        for(i in clicker.upgrades){
            if(clicker1.upgrades[i] == null){
                clicker1.upgrades[i] = clicker.upgrades[i];
            }
        }
        clicker = clicker1;
    
    clicker = clicker1
    }
    update_upgrades();
    setInterval(() => {
        for(i in clicker.upgrades){
            clicker.bananas+=clicker.upgrades[i].amount*clicker.upgrades[i].bps/20
        }
        for(i in clicker.badges){
            var b = new Function('return '+clicker.badges[i].req);
             if(b() && !clicker.badges[i].gotten){
                clicker.badges[i].gotten = true;
                document.querySelector("#badges").innerHTML+=`<br><br><b>[BADGE REWARDED]</b><br>${clicker.badges[i].text}`;
            }
        }
        document.querySelector("#bananas").innerHTML = "You have "+String(clicker.bananas).split(".")[0]+" Bananas";
        delay++;
        if (delay >= 40){
            Cookies.set("clicker",JSON.stringify(clicker), {expires: 100000})
            delay = 0;
        }
        },50);
}
