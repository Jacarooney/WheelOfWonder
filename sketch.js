//WHEEL AESTHETICS
var wheelRadius = 100;
var txtSize = 1;
var namesSize = 1;

//WHEEL COVER ANIMATION
var wheelAnim = 0;

//SNAPSHOT
var wheelSnapshot = [];
var pointerEnter = false;
var pointerAnim = 0;

//TEAMS
var data;
var teams = [];
var emails = [];
var dupes = [];
var numTeams = 0;
var teamsAdded = false;
var longestName;

//STATES
var state = 0;
var finish = false;
var printEmail = false;

//SPIN
var delta = 0;
var direction = 5;
var speed = 0;
var theta = 0;
var randomize = 0;
var rotations = 0;
var winner;

//ASSETS
var myFont;
var click;
var grain;
var ding;
var woosh;
var chime;

function preload() {
  myFont = loadFont('Ranchers-Regular.ttf');
  click = loadSound('click1.m4a');
  grain = loadImage('grain.png');
  ding = loadSound('ding.m4a');
  woosh = loadSound('woosh.m4a');
  chime = loadSound('chime.m4a');
}

function setup() {
  //INITIALISE STYLING & AUDIO
  textAlign(CENTER, CENTER);
  ding.setVolume(2);
  woosh.setVolume(4);
  chime.setVolume(2);
  click.setVolume(1);
  //rectMode(CENTER);

  //INITIALISE DIMENSIONS
  if (windowWidth >= 2 * windowHeight) {
    createCanvas(2 * windowHeight, windowHeight);
  } else {
    createCanvas(windowWidth, windowWidth / 2);
  }
  wheelRadius = 3.8 * height / 4;

  //SPIN
  randomize = random(30, 40);
}

function windowResized() {
  //INITIALISE DIMENSIONS
  if (windowWidth >= 2 * windowHeight) {
    resizeCanvas(2 * windowHeight, windowHeight);
  } else {
    resizeCanvas(windowWidth, windowWidth / 2);
  }
  wheelRadius = 3.8 * height / 4;

  namesSize = 1;

}

function draw() {
  background(43, 23, 5);
  //background(54, 16, 8);

  // STATE 4
  if (state == 4) {

    if (pointerAnim < 3 * width / 4 - wheelRadius / 2) {
      pointerAnim += 50;
      image(wheelSnapshot, 0, 0, width, height);
    } else {
      pointerAnim = 3 * width / 4 - wheelRadius / 2;
      push();
      translate(3 * width / 4, height / 2);
      rotate(randomize * theta / 200);
      image(wheelSnapshot, -3 * width / 4, -height / 2, width, height);
      pop();
    }



    //SPIN
    if (delta <= 0 && direction > 0) {
      direction = 20;
    } else if (delta <= 0 && direction < 0) {
      direction = 0;
      delta = 0;
      ding.play();
      finish = true;
    } else if (delta >= 1) {
      direction = -1.3;
    }
    delta += 0.002 * direction;
    speed = floor(lerp(0, 100, delta));
    theta = theta + speed;

    if (rotations < 360 / numTeams) {
      rotations += randomize * speed / 200;
    } else {
      rotations = 0;
      click.rate(random(0.98, 1.1));
      click.play();
    }

    var subDiv = 360 / numTeams;

    if ((ceil(((theta * randomize / 200 + 180) % 360) / subDiv)) == 0) {
      winner = 0;
    } else {
      winner = numTeams - (ceil(((theta * randomize / 200 + 180) % 360) / subDiv));
    }



    //POINTER
    push();
    fill(237, 223, 178);
    rectMode(CORNER);
    rect(pointerAnim / 2 - (3 * width / 4 - wheelRadius / 2) / 2, height / 2 - height / 40, 3 * width / 4 - wheelRadius / 2, height / 20);

    rectMode(CENTER);
    strokeWeight(height / 80);
    stroke(237, 223, 178);
    if (finish) {
      fill(126, 194, 207);
    } else {
      fill(212, 56, 44);
    }
    rect(pointerAnim / 2, height / 2, 0.9 * wheelRadius, wheelRadius / 4, height / 6);

    noStroke();
    fill(237, 223, 178);
    triangle(pointerAnim - 1, height / 2 - height / 40, pointerAnim - 1, height / 2 + height / 40, pointerAnim + wheelRadius / 40, height / 2);
    fill(43, 23, 5);
    textSize(namesSize);
    if (textWidth(longestName) <= wheelRadius / 1.6) {
      namesSize +=10;
      if (textAscent() > wheelRadius / 6) {
        namesSize-=10;
      }
    }
    text(teams[winner], pointerAnim / 2, height / 2 - height / 69);
    if (finish && !printEmail){
      print(emails[winner]);
      printEmail = true;
    }
    pop();
  }

  //OOP
  if (state < 2) {
    //RECT ELEMENT
    fill(212, 56, 44);
    strokeWeight(height / 80);
    stroke(237, 223, 178);
    rect(wheelAnim * (width / 5) - width / 8, height / 2 - height / 6, 2 * width, height / 3, height / 6);

    //TITLE
    noStroke();
    textFont(myFont);
    textSize(height / 11);
    //fill(212, 56, 44);
    fill(237, 223, 178);
    text("MIKE'S", width / 4 + wheelAnim * (width / 5), height / 2 - height / 4.7);
    textSize(height / 10);
    fill(43, 23, 5);
    //fill(54,16,8);
    text("WHEEL\nOF WONDER", width / 4 + wheelAnim * (width / 5), height / 2 - height / 150);
  }

  //STATE 2
  push();
  if (state > 0 && state < 3) {

    angleMode(DEGREES);
    numTeams = teams.length;

    translate(3 * width / 4, height / 2);

    //     fill(21, 114, 143);
    //     fill(126, 194, 207);
    //     fill(237, 218, 183);
    //     fill(237, 155, 100);
    //     fill(212, 56, 44);

    textFont('helvetica');
    noStroke();

    //AUTO TEXT RE-SIZE

    textSize(txtSize);
    if (textWidth(longestName) < wheelRadius / 2 - wheelRadius / 8) {
      txtSize++;
      if (textAscent() > 0.9 * wheelRadius / numTeams) {
        txtSize--;
      }
    }


    for (s = 0; s < numTeams; s++) {
      // if (s % 4 == 0) {
      //   fill(21, 114, 143);
      // } else if (s % 4 == 1) {
      //   fill(126, 194, 207);
      // } else if (s % 4 == 2) {
      //   fill(212, 56, 44);
      // } else {
      //   fill(237, 218, 183);
      // }


      if (s < numTeams / 3) {
        fill(212 - s * (212 - 237) / (numTeams / 3), 56 - s * (56 - 155) / (numTeams / 3), 44 - s * (44 - 100) / (numTeams / 3));
      } else if (s < 2 * numTeams / 3) {
        fill(237 - (s - numTeams / 3) * (237 - 21) / (numTeams / 3), 155 - (s - numTeams / 3) * (155 - 114) / (numTeams / 3), 100 - (s - numTeams / 3) * (100 - 143) / (numTeams / 3));
      } else {
        fill(21 - (s - 2 * numTeams / 3) * (21 - 212) / (numTeams / 3), 114 - (s - 2 * numTeams / 3) * (114 - 56) / (numTeams / 3), 143 - (s - 2 * numTeams / 3) * (143 - 44) / (numTeams / 3));
      }
      stroke(237, 218, 183);
      arc(0, 0, wheelRadius, wheelRadius, s * 360 / numTeams, (s + 1) * 360 / numTeams);

      noStroke();
      push();
      rotate(s * 360 / numTeams + 180 / numTeams);
      translate(wheelRadius / 4, 0);
      rotate(180);
      fill(43, 23, 5);
      text(teams[s], 0, 0);
      pop();

    }
    if (state == 2) {
      wheelSnapshot = createImage(floor(width), floor(height));
      wheelSnapshot = get(0, 0, width, height);
      state = 4;
      pointerEnter = true;
      woosh.play();
    }

  }
  pop();

  //STATES 0&1
  if (state < 2) {

    //STATE 1 ANIMATION
    if (state == 1) {
      if (wheelAnim < 2 * PI - 0.1) {
        wheelAnim += 0.1;
      } else {
        wheelAnim = 2 * PI;
        state = 2;
        //noLoop();
      }
    }

    angleMode(RADIANS);
    //WHEEL COVER

    stroke(237, 218, 183);
    fill(21, 114, 143);
    arc(3 * width / 4, height / 2, wheelRadius, wheelRadius, wheelAnim, 2 * PI);
    noStroke();
    fill(126, 207, 180);
    arc(3 * width / 4, height / 2, 0.8 * wheelRadius, 0.8 * wheelRadius, wheelAnim, 2 * PI);
    fill(237, 218, 183);
    arc(3 * width / 4, height / 2, 0.6 * wheelRadius, 0.6 * wheelRadius, wheelAnim, 2 * PI);
    fill(237, 155, 100);
    arc(3 * width / 4, height / 2, 0.4 * wheelRadius, 0.4 * wheelRadius, wheelAnim, 2 * PI);
    fill(212, 56, 44);
    arc(3 * width / 4, height / 2, 0.2 * wheelRadius, 0.2 * wheelRadius, wheelAnim, 2 * PI);

    if (state == 0) {
      noLoop();
    }

  }
}

function mousePressed() {
  if (state == 0) {
    //LOAD JSON
    if (!teamsAdded) {
   fetch(`https://docs.google.com/spreadsheets/d/1EWkHbjjr4RNvDhZalAziS2pU-8KI-4a6ACxywBdg30k/gviz/tq?tqx=out:json`)
    .then(res => res.text())
    .then(text => {
        data = JSON.parse(text.substr(47).slice(0, -2));
        updateTeams(data);
    });
      
    }
    teamsAdded = true;
  }
}

function updateTeams(data) {
  var currentdate = new Date();
  var date;

  if ((currentdate.getMonth() + 1) < 10 && (currentdate.getDate()) < 10) {
    date = currentdate.getFullYear() + '-' + "0" +
      (currentdate.getMonth() + 1) + "-" + "0" +
      currentdate.getDate();
  } else if ((currentdate.getMonth() + 1) < 10) {
    date = currentdate.getFullYear() + '-' + "0" +
      (currentdate.getMonth() + 1) + "-" +
      currentdate.getDate();
  } else if ((currentdate.getDate()) < 10) {
    date = currentdate.getFullYear() + '-' +
      (currentdate.getMonth() + 1) + "-" + "0" +
      currentdate.getDate();
  } else {
    date = currentdate.getFullYear() + '-' +
      (currentdate.getMonth() + 1) + "-" +
      currentdate.getDate();
  }

  // for (i = 0; i < data.feed.entry.length; i++) {
  //   //if (data.feed.entry[i].updated.$t.includes(date)){
  //   if (i % 3 == 2) {
  //     if (data.feed.entry[i].content.$t != 'Name') {
  //       teams.push(data.feed.entry[i].content.$t);
  //     }
  //   } else if (i % 3 == 1) {
  //     if (data.feed.entry[i].content.$t != 'Email Address') {
  //       emails.push(data.feed.entry[i].content.$t);
  //     }
  //   }
  //   //}
  // }
  
  for (let i = 0; i < data.table.rows.length; i++){
    emails.push(data.table.rows[i].c[1].v);
    teams.push(data.table.rows[i].c[2].v);
  }
  
  //lowercase emails
  emails = emails.map(email => email.toLowerCase());

  //indices of duplicates
  var indexes = [];

for(var i = 0; i < emails.length; i++){
  if (indexes[emails[i]]){
    dupes.push(i); 
  }else{
    indexes[emails[i]] = 1;
  }
}
  
  //remove dupes from emails and teams arrays
  for (j = 0; j < dupes.length; j++){
    emails.splice(dupes[j]-j,1);
    teams.splice(dupes[j]-j,1);  
  }
  
  if (teams[0] == undefined){
    teams = ['No Entrants','Daisy','Whoopsy'];
    emails = ['','',''];
  }
  
  //RANDOMISE ORDER
  let index = [];
  for (let z = 0; z < teams.length; z++){
    index[z] = z;
  }
  index.sort(function(a, b){return 0.5 - Math.random()});
  
  let tempTeams = [];
  let tempEmails = [];
  for (let p = 0; p < teams.length; p++){
    tempTeams[index[p]] = teams[p];
    tempEmails[index[p]] = emails[p];
  }
  teams = tempTeams;
  emails = tempEmails;

  var lgth = 0;
  for (var k = 0; k < teams.length; k++) {
    if (teams[k].length > lgth) {
      lgth = teams[k].length;
      longestName = teams[k];
    }
  }

  state = 1;
  chime.play();
  loop();
}

