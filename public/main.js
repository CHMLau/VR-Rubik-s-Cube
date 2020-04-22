window.onload = (event) =>{
  const cube = document.getElementById("js--cube");
  const parentCube = document.getElementById("js--parentCube");
  const scene = document.getElementsByClassName("js--scene");
  const spot = document.getElementById("js--spot-tutorial");
  const tutorialbord = document.getElementById("js--tutorialbord");
  const video = document.getElementById("js--video-tutorial");
  const explaneLineOne = document.getElementById("js--explaneLineOne");
  const explaneLineTwo = document.getElementById("js--explaneLineTwo");
  const level1Img = document.getElementById("level1");
  const tapijt = document.getElementById("js--tapijt");


  // const level1Ja = document.getElementById("js--level1Ja");
  const door = document.getElementById("js--door");
  const places = document.getElementsByClassName("js--place");
  const roomlight = document.getElementById("js--roomlight");

  const kleurenlijst = ["Draai zo dat het rode vlak compleet is!                  TIP: kijk naar het blauwe vlak", "Draai zo dat het blauwe vlak compleet is!                  TIP: kijk naar het gele vlak"];

  //animations
  const floatUpAnimation = "property: position; dur: 5000; easing: linear; to: 0 1 -2";
  const resizeAnimation = "property: scale; dur: 5000; easing: linear; to: 0.25 0.25 0.25";
  const tutorialShowAnimation = "property: material.opacity; dur: 2500; easing: linear; to: 1";
  const tutorialRemoveAnimation = "property: material.opacity; dur: 2500; easing: linear; to: 0";
  const levelDoorAnimation = "property: position; dur: 2500; easing: linear; to: -2.75 1.25 4.9";
  const lightAnimation = "property: light.intensity; dur: 2500; easing: linear; to: 1";



  //meubels
  const muren = document.getElementsByClassName("muren");
  const bank = document.getElementById("bank");
  const sky = document.querySelector("a-sky");
  const rig = document.getElementById("js--rig");
  const level1 = document.getElementsByClassName("level1");
  const klok = document.getElementById("js--klok");
  const bureau = document.getElementById("js--bureau");
  const bookcase = document.getElementById("js--bookcase");
  const bed = document.getElementById("js--bed");

  //API winners
  let wikiText = '';
  const winnerslist = [];
  const winnerstime = [];
  const winnersname = [];
  let fastest_time = 0;
  let fastest_person = "CORS UIT";
  const tijdPoster = document.getElementById("js--tijdPoster");

  //audio
  const clockTick = new Audio("Audio/clock_tick.mp3");
  const doorOpening = new Audio("Audio/deur.wav");
  const cubeTurn = new Audio("Audio/rubixturn.wav");
  const celebration = new Audio("Audio/celebration.wav");

  cube.onmouseenter = (event) => {
    //start animation cube
    cube.setAttribute("animation__floatUp", floatUpAnimation);
    cube.setAttribute("animation__resize", resizeAnimation);
    // tutorial screen pops up
    spot.setAttribute("light", "type: spot; angle: 45; intensity: 1;");
    //set up
    turnCubeUI.setAttribute("visible", "true");
  }

  door.onclick = (event) =>{
    door.setAttribute("animation__swipe", levelDoorAnimation);
    tapijt.setAttribute("class", "js--place clickable");
    explaneLineOne.setAttribute("value","Stap 1:");
    explaneLineTwo.setAttribute("value","Kijk naar het tapijt");

  }


  for (let i = 0; i < places.length; i++){
    places[i].addEventListener('click', function(evt){
      let att = document.createAttribute("animation");
      att.value = "property: position; easing: linear; dur: 5000; to: " + this.getAttribute("position").x + " 0 " + this.getAttribute("position").z;
      rig.setAttribute("animation", att.value);
      parentCube.setAttribute("position", "-1.5 0 8");
      parentCube.setAttribute("rotation", "0 220 0");
      turnFaceUI.setAttribute("position", "-0.5 0.7 9.2");
      turnFaceUI.setAttribute("rotation", "0 220 0");
      turnCubeUI.setAttribute("position", "-3.99 2 8.5");
      turnCubeUI.setAttribute("rotation", "0 90 0");
      turnCubeUI.setAttribute("scale", "0.1 0.1 0.1");
      roomlight.setAttribute("animation__light",lightAnimation);
      explaneLineOne.setAttribute("value","Level 1:");
      explaneLineTwo.setAttribute("value","Draai de cubes zoals op de poster                             En zet de timer aan als je wil weten hoe snel je het doet");
    });
  }

  //collect the json
  fetch("https://en.wikipedia.org/w/api.php?action=parse&page=Rubik%27s_Cube&prop=wikitext&formatversion=2&format=json")
    .then((data) => {
        return data.json();
    })
    .then((response) => {
      //spliting the text to get to de winners and then split the table in place, name and time.
      wikiText = response.parse.wikitext;
      let textPart = wikiText.split("===");
      let winners = textPart[40].split("\n");
      for (let i = 8; i < 64; i++){
        let place = winners[i].split("|");
        i += 1;
        let name = winners[i].split("|");
        i += 1;
        let time = winners[i].split("|");
        let zin = "De nummer " + place[1] + " is " + name[1] + " met de snelheid van " + time[1] + " seconde"
        winnerslist.push(zin);
        winnerstime.push(time[1]);
        winnersname.push(name[1]);

        i += 3;
      }
      //snelste tijd wiki
      console.log(winnerstime[0]);
      fastest_time = winnerstime[0];
      fastest_person = winnersname[0];
      tijdPoster.setAttribute("value", fastest_person + " - " + fastest_time + "s");
    });

      const turnArrows = document.getElementsByClassName("js--turnArrow");
      const progression_books = document.getElementsByClassName("js--bookcase__progress_book");

      const turnFaceUI = document.getElementById("js--turnFaceUI");
      const centerFields = document.getElementsByClassName("js--center");

      const turnCubeUI = document.getElementById("js--turnCubeUI");
      const turnCubeFaces = document.getElementsByClassName("js--turnCubeFace");
      const turnCubeFacePlanes = document.getElementsByClassName("js--turnCubeFace__plane");

      const arms = document.getElementsByClassName("js--arm");

      const startButton = document.getElementById("js--buttonStart");
      const stopButton = document.getElementById("js--buttonStop");
      const timer = document.getElementById("js--time");

      let rotationSpeed = 750;

      let selectedFace = "front";

      let tutorial = true;
      let tutorialStep = 1;
      let firstTimeSelectingFace = true;

      let progressCounter = 0;

      let timerRunning = false;
      let timeTook = 0;

      let flower = false;
      let levelFlowerFinished = false;

      //tutorial cube states
        //step 1
      const tutorial1Begin = {top:{topRow:["blue", "blue", "#292929"],
                        midRow:["blue", "blue", "#292929"],
                        botRow:["blue", "blue", "#292929"]},
                  bottom:{topRow:["#292929", "#292929", "#292929"],
                        midRow:["#292929", "#292929", "#292929"],
                        botRow:["#292929", "#292929", "#292929"]},
                  front:{topRow:["#292929", "#292929", "blue"],
                        midRow:["#292929", "#292929", "blue"],
                        botRow:["#292929", "#292929", "blue"]},
                  back:{topRow:["#292929", "#292929", "#292929"],
                        midRow:["#292929", "#292929", "#292929"],
                        botRow:["#292929", "#292929", "#292929"]},
                  left:{topRow:["#292929", "#292929", "#292929"],
                        midRow:["#292929", "#292929", "#292929"],
                        botRow:["#292929", "#292929", "#292929"]},
                  right:{topRow:["#292929", "#292929", "#292929"],
                        midRow:["#292929", "#292929", "#292929"],
                        botRow:["#292929", "#292929", "#292929"]}};
      const tutorial1End = {top:{topRow:["blue", "blue", "blue"],
                        midRow:["blue", "blue", "blue"],
                        botRow:["blue", "blue", "blue"]},
                  bottom:{topRow:["#292929", "#292929", "#292929"],
                        midRow:["#292929", "#292929", "#292929"],
                        botRow:["#292929", "#292929", "#292929"]},
                  front:{topRow:["#292929", "#292929", "#292929"],
                        midRow:["#292929", "#292929", "#292929"],
                        botRow:["#292929", "#292929", "#292929"]},
                  back:{topRow:["#292929", "#292929", "#292929"],
                        midRow:["#292929", "#292929", "#292929"],
                        botRow:["#292929", "#292929", "#292929"]},
                  left:{topRow:["#292929", "#292929", "#292929"],
                        midRow:["#292929", "#292929", "#292929"],
                        botRow:["#292929", "#292929", "#292929"]},
                  right:{topRow:["#292929", "#292929", "#292929"],
                        midRow:["#292929", "#292929", "#292929"],
                        botRow:["#292929", "#292929", "#292929"]}};
        //step 2
      const tutorial2Begin = {top:{topRow:["blue", "blue", "blue"],
                        midRow:["blue", "blue", "blue"],
                        botRow:["blue", "blue", "blue"]},
                  bottom:{topRow:["#292929", "#292929", "#292929"],
                        midRow:["#292929", "#292929", "#292929"],
                        botRow:["#292929", "#292929", "#292929"]},
                  front:{topRow:["#292929", "#292929", "#292929"],
                        midRow:["red", "red", "red"],
                        botRow:["red", "red", "red"]},
                  back:{topRow:["#292929", "#292929", "#292929"],
                        midRow:["#292929", "#292929", "#292929"],
                        botRow:["#292929", "#292929", "#292929"]},
                  left:{topRow:["red", "red", "red"],
                        midRow:["#292929", "#292929", "#292929"],
                        botRow:["#292929", "#292929", "#292929"]},
                  right:{topRow:["#292929", "#292929", "#292929"],
                        midRow:["#292929", "#292929", "#292929"],
                        botRow:["#292929", "#292929", "#292929"]}};
      const tutorial2End = {top:{topRow:["blue", "blue", "blue"],
                        midRow:["blue", "blue", "blue"],
                        botRow:["blue", "blue", "blue"]},
                  bottom:{topRow:["#292929", "#292929", "#292929"],
                        midRow:["#292929", "#292929", "#292929"],
                        botRow:["#292929", "#292929", "#292929"]},
                  front:{topRow:["red", "red", "red"],
                        midRow:["red", "red", "red"],
                        botRow:["red", "red", "red"]},
                  back:{topRow:["#292929", "#292929", "#292929"],
                        midRow:["#292929", "#292929", "#292929"],
                        botRow:["#292929", "#292929", "#292929"]},
                  left:{topRow:["#292929", "#292929", "#292929"],
                        midRow:["#292929", "#292929", "#292929"],
                        botRow:["#292929", "#292929", "#292929"]},
                  right:{topRow:["#292929", "#292929", "#292929"],
                        midRow:["#292929", "#292929", "#292929"],
                        botRow:["#292929", "#292929", "#292929"]}};

        //step 3
      const tutorial3Begin = {top:{topRow:["blue", "blue", "blue"],
                        midRow:["blue", "blue", "blue"],
                        botRow:["#292929", "#292929", "#292929"]},
                  bottom:{topRow:["#292929", "#292929", "#292929"],
                        midRow:["#292929", "#292929", "#292929"],
                        botRow:["#292929", "#292929", "#292929"]},
                  front:{topRow:["red", "red", "red"],
                        midRow:["red", "red", "red"],
                        botRow:["red", "red", "red"]},
                  back:{topRow:["#ff6400", "#ff6400", "#ff6400"],
                        midRow:["#ff6400", "#ff6400", "#ff6400"],
                        botRow:["#ff6400", "#ff6400", "#ff6400"]},
                  left:{topRow:["#292929", "#292929", "#292929"],
                        midRow:["#292929", "#292929", "#292929"],
                        botRow:["#292929", "#292929", "#292929"]},
                  right:{topRow:["blue", "#292929", "#292929"],
                        midRow:["blue", "#292929", "#292929"],
                        botRow:["blue", "#292929", "#292929"]}};
      const tutorial3End = {top:{topRow:["blue", "blue", "blue"],
                        midRow:["blue", "blue", "blue"],
                        botRow:["blue", "blue", "blue"]},
                  bottom:{topRow:["#292929", "#292929", "#292929"],
                        midRow:["#292929", "#292929", "#292929"],
                        botRow:["#292929", "#292929", "#292929"]},
                  front:{topRow:["red", "red", "red"],
                        midRow:["red", "red", "red"],
                        botRow:["red", "red", "red"]},
                  back:{topRow:["#ff6400", "#ff6400", "#ff6400"],
                        midRow:["#ff6400", "#ff6400", "#ff6400"],
                        botRow:["#ff6400", "#ff6400", "#ff6400"]},
                  left:{topRow:["#292929", "#292929", "#292929"],
                        midRow:["#292929", "#292929", "#292929"],
                        botRow:["#292929", "#292929", "#292929"]},
                  right:{topRow:["#292929", "#292929", "#292929"],
                        midRow:["#292929", "#292929", "#292929"],
                        botRow:["#292929", "#292929", "#292929"]}};
      const tutorials = {1:{begin:tutorial1Begin,end:tutorial1End},
                        2:{begin:tutorial2Begin,end:tutorial2End},
                        3:{begin:tutorial3Begin,end:tutorial3End}};

      const flowerEndCube = {top:{topRow:["#292929", "white", "#292929"],
                          midRow:["white", "yellow", "white"],
                          botRow:["#292929", "white", "#292929"]},
                    bottom:{topRow:["#292929", "#292929", "#292929"],
                          midRow:["#292929", "white", "#292929"],
                          botRow:["#292929", "#292929", "#292929"]},
                    front:{topRow:["#292929", "#292929", "#292929"],
                          midRow:["#292929", "green", "#292929"],
                          botRow:["#292929", "#292929", "#292929"]},
                    back:{topRow:["#292929", "#292929", "#292929"],
                          midRow:["#292929", "blue", "#292929"],
                          botRow:["#292929", "#292929", "#292929"]},
                    left:{topRow:["#292929", "#292929", "#292929"],
                          midRow:["#292929", "red", "#292929"],
                          botRow:["#292929", "#292929", "#292929"]},
                    right:{topRow:["#292929", "#292929", "#292929"],
                          midRow:["#292929", "#ff6400", "#292929"],
                          botRow:["#292929", "#292929", "#292929"]}};

      const getFaces = () =>{

        let backSide =  {topRow:[null, null, null],
                        midRow:[null, null, null],
                        botRow:[null, null, null]};
        let frontSide = {topRow:[null, null, null],
                        midRow:[null, null, null],
                        botRow:[null, null, null]};
        let rightSide = {topRow:[null, null, null],
                        midRow:[null, null, null],
                        botRow:[null, null, null]};
        let leftSide =  {topRow:[null, null, null],
                        midRow:[null, null, null],
                        botRow:[null, null, null]};
        let upSide =    {topRow:[null, null, null],
                        midRow:[null, null, null],
                        botRow:[null, null, null]};
        let downSide =  {topRow:[null, null, null],
                        midRow:[null, null, null],
                        botRow:[null, null, null]};

        for (let i = 0; i < arms.length; i++) {
          let childNodes = arms[i].childNodes;

          for (let j = 1; j < childNodes.length; j += 2) {
            let position = childNodes[j].getAttribute("position");

            if (position.z == 1.5){ //INIT FRONT SIDE
              switch (position.y) {
                case 1:
                  frontSide.topRow[(position.x + 1)] = childNodes[j];
                  break;
                case 0:
                  frontSide.midRow[(position.x + 1)] = childNodes[j];
                  break;
                case -1:
                  frontSide.botRow[(position.x + 1)] = childNodes[j];
                  break;
              }

            }
            if (position.z == -1.5) { //INIT BACK SIDE
              switch (position.y) {
                case 1:
                  backSide.topRow[(position.x + 1)] = childNodes[j];
                  break;
                case 0:
                  backSide.midRow[(position.x + 1)] = childNodes[j];
                  break;
                case -1:
                  backSide.botRow[(position.x + 1)] = childNodes[j];
                  break;
              }

            }
            if (position.x == -1.5) { //INIT LEFT SIDE
              switch (position.y) {
                case 1:
                  leftSide.topRow[(position.z + 1)] = childNodes[j];
                  break;
                case 0:
                  leftSide.midRow[(position.z + 1)] = childNodes[j];
                  break;
                case -1:
                  leftSide.botRow[(position.z + 1)] = childNodes[j];
                  break;
              }

            }
            if (position.x == 1.5){ //INIT RIGHT SIDE
              switch (position.y) {
                case 1:
                  rightSide.topRow[(position.z + 1)] = childNodes[j];
                  break;
                case 0:
                  rightSide.midRow[(position.z + 1)] = childNodes[j];
                  break;
                case -1:
                  rightSide.botRow[(position.z + 1)] = childNodes[j];
                  break;
              }

            }
            if (position.y == 1.5) {  //INIT TOP SIDE
              switch (position.z) {
                case 1:
                  upSide.topRow[(position.x + 1)] = childNodes[j];
                  break;
                case 0:
                  upSide.midRow[(position.x + 1)] = childNodes[j];
                  break;
                case -1:
                  upSide.botRow[(position.x + 1)] = childNodes[j];
                  break;
              }

            }
            if (position.y == -1.5) { //INIT BOT SIDE
              switch (position.z) {
                case 1:
                  downSide.topRow[(position.x + 1)] = childNodes[j];
                  break;
                case 0:
                  downSide.midRow[(position.x + 1)] = childNodes[j];
                  break;
                case -1:
                  downSide.botRow[(position.x + 1)] = childNodes[j];
                  break;
              }
            }
          }
        }

        let cubeFaces =
         {top:upSide,
          bottom:downSide,
          front:frontSide,
          back:backSide,
          left:leftSide,
          right:rightSide
        };
        return cubeFaces;
      }

      const getColors = () =>{

            let backSide =  {topRow:[null, null, null],
                            midRow:[null, null, null],
                            botRow:[null, null, null]};
            let frontSide = {topRow:[null, null, null],
                            midRow:[null, null, null],
                            botRow:[null, null, null]};
            let rightSide = {topRow:[null, null, null],
                            midRow:[null, null, null],
                            botRow:[null, null, null]};
            let leftSide =  {topRow:[null, null, null],
                            midRow:[null, null, null],
                            botRow:[null, null, null]};
            let upSide =    {topRow:[null, null, null],
                            midRow:[null, null, null],
                            botRow:[null, null, null]};
            let downSide =  {topRow:[null, null, null],
                            midRow:[null, null, null],
                            botRow:[null, null, null]};

            for (let i = 0; i < arms.length; i++) {
              let childNodes = arms[i].childNodes;

              for (let j = 1; j < childNodes.length; j += 2) {
                let position = childNodes[j].getAttribute("position");

                if (position.z == 1.5){ //INIT FRONT SIDE
                  switch (position.y) {
                    case 1:
                      frontSide.topRow[(position.x + 1)] = childNodes[j].getAttribute("color");
                      break;
                    case 0:
                      frontSide.midRow[(position.x + 1)] = childNodes[j].getAttribute("color");
                      break;
                    case -1:
                      frontSide.botRow[(position.x + 1)] = childNodes[j].getAttribute("color");
                      break;
                  }

                }
                if (position.z == -1.5) { //INIT BACK SIDE
                  switch (position.y) {
                    case 1:
                      backSide.topRow[(position.x + 1)] = childNodes[j].getAttribute("color");
                      break;
                    case 0:
                      backSide.midRow[(position.x + 1)] = childNodes[j].getAttribute("color");
                      break;
                    case -1:
                      backSide.botRow[(position.x + 1)] = childNodes[j].getAttribute("color");
                      break;
                  }

                }
                if (position.x == -1.5) { //INIT LEFT SIDE
                  switch (position.y) {
                    case 1:
                      leftSide.topRow[(position.z + 1)] = childNodes[j].getAttribute("color");
                      break;
                    case 0:
                      leftSide.midRow[(position.z + 1)] = childNodes[j].getAttribute("color");
                      break;
                    case -1:
                      leftSide.botRow[(position.z + 1)] = childNodes[j].getAttribute("color");
                      break;
                  }

                }
                if (position.x == 1.5){ //INIT RIGHT SIDE
                  switch (position.y) {
                    case 1:
                      rightSide.topRow[(position.z + 1)] = childNodes[j].getAttribute("color");
                      break;
                    case 0:
                      rightSide.midRow[(position.z + 1)] = childNodes[j].getAttribute("color");
                      break;
                    case -1:
                      rightSide.botRow[(position.z + 1)] = childNodes[j].getAttribute("color");
                      break;
                  }

                }
                if (position.y == 1.5) {  //INIT TOP SIDE
                  switch (position.z) {
                    case 1:
                      upSide.topRow[(position.x + 1)] = childNodes[j].getAttribute("color");
                      break;
                    case 0:
                      upSide.midRow[(position.x + 1)] = childNodes[j].getAttribute("color");
                      break;
                    case -1:
                      upSide.botRow[(position.x + 1)] = childNodes[j].getAttribute("color");
                      break;
                  }

                }
                if (position.y == -1.5) { //INIT BOT SIDE
                  switch (position.z) {
                    case 1:
                      downSide.topRow[(position.x + 1)] = childNodes[j].getAttribute("color");
                      break;
                    case 0:
                      downSide.midRow[(position.x + 1)] = childNodes[j].getAttribute("color");
                      break;
                    case -1:
                      downSide.botRow[(position.x + 1)] = childNodes[j].getAttribute("color");
                      break;
                  }
                }
              }
            }

            let cubeFaces =
             {top:upSide,
              bottom:downSide,
              front:frontSide,
              back:backSide,
              left:leftSide,
              right:rightSide};

            return cubeFaces;
      }

      const setFaces = (presetCube) =>{
        let setFrontSide = [];
        for(let row in presetCube.front){
          for (var i = 0; i < presetCube.front[row].length; i++) {
            setFrontSide.push(presetCube.front[row][i].getAttribute("color"));
          }
        }
        let setBackSide = [];
        for(let row in presetCube.back){
          for (var i = 0; i < presetCube.back[row].length; i++) {
            setBackSide.push(presetCube.back[row][i].getAttribute("color"));
          }
        }
        let setLeftSide = [];
        for(let row in presetCube.left){
          for (var i = 0; i < presetCube.left[row].length; i++) {
            setLeftSide.push(presetCube.left[row][i].getAttribute("color"));
          }
        }
        let setRightSide = [];
        for(let row in presetCube.right){
          for (var i = 0; i < presetCube.right[row].length; i++) {
            setRightSide.push(presetCube.right[row][i].getAttribute("color"));
          }
        }
        let setTopSide = [];
        for(let row in presetCube.top){
          for (var i = 0; i < presetCube.top[row].length; i++) {
            setTopSide.push(presetCube.top[row][i].getAttribute("color"));
          }
        }
        let setBottomSide = [];
        for(let row in presetCube.bottom){
          for (var i = 0; i < presetCube.bottom[row].length; i++) {
            setBottomSide.push(presetCube.bottom[row][i].getAttribute("color"));
          }
        }

        for (let i = 0; i < arms.length; i++) {
          let childNodes = arms[i].childNodes;

          for (let j = 1; j < childNodes.length; j += 2) {
            let position = childNodes[j].getAttribute("position");

            if (position.z == 1.5) {
              childNodes[j].setAttribute("color", setFrontSide[0]);
              return;
            }
            if (position.z == -1.5) {
              childNodes[j].setAttribute("color", setBackSide[0]);
              return;
            }
            if (position.x == -1.5) {
              childNodes[j].setAttribute("color", setLeftSide[0]);
              return;
            }
            if (position.x == 1.5) {
              childNodes[j].setAttribute("color", setRightSide[0]);
              return;
            }
            if (position.y == 1.5) {
              childNodes[j].setAttribute("color", setTopSide[0]);
              return;
            }
            if (position.y == -1.5) {
              childNodes[j].setAttribute("color", setBottomSide[0]);
              return;
            }
          }
        }
      }

      const setColors = (presetCube) =>{
        let tempCube = getFaces();

        for(face in tempCube){
          for(row in tempCube[face]){
            for(plane in tempCube[face][row]){
              tempCube[face][row][plane].setAttribute("color", presetCube[face][row][plane])
            }
          }
        }
      }

      const rotateFace = (cube, turnFace, direction) =>{
        cubeTurn.play();
        let face = cube[turnFace];

        let rotation_axes = {z:{left:"0 0 90", right:"0 0 -90"},
                             x:{left:"-90 0 0", right:"90 0 0"},
                             y:{left:"0 -90 0", right:"0 90 0"}};

       let collateral_sides = {top:["front", "right", "back", "left"],
                               bottom:["front", "right", "back", "left"],
                               front:["top", "left", "bottom", "right"],
                               back:["top", "left", "bottom", "right"],
                               left:["top", "back", "bottom", "front"],
                               right:["top", "back", "bottom", "front"]};

        let collateral_coords = {top:{y:1.5},
                                 bottom:{y:-1.5},
                                 front:{z:1.5},
                                 back:{z:-1.5},
                                 left:{x:-1.5},
                                 right:{x:1.5}};

        let rotateArms = [];
        let rotationDegrees = "";

        //get arms and rotation_axis
        for(let rows in face){
          for (let i = 0; i < face[rows].length; i++) {
            rotateArms.push(face[rows][i].parentNode);
            if (face[rows][i].parentNode.hasAttribute("center")) {
              rotationDegrees = rotation_axes[face[rows][i].getAttribute("data-rotatation_axis")][direction];
            }
          }
        }

        //set rotation animation on arms
        for (let i = 0; i < rotateArms.length; i++) {
          rotateArms[i].setAttribute("animation__turn", "property: rotation; easing:linear; dur: " + rotationSpeed + "; to: " + rotationDegrees);
        }
        //after animation is finished
        setTimeout(()=>{
          //remove rotation animation and reset rotation after animation is finished
          for (var i = 0; i < rotateArms.length; i++) {
            rotateArms[i].removeAttribute("animation__turn");
            rotateArms[i].setAttribute("rotation","0 0 0");
          }

          //get position of faces/planes so we can rotate colors
          let currentCube = getColors();
          //cube to replace og cube with
          let cubePreset = getFaces();

          if (direction === "left") {//rotate face to left
            //DEV: UN-DRY
            cubePreset[turnFace]["topRow"][0].setAttribute("color", currentCube[turnFace]["topRow"][2]);
            cubePreset[turnFace]["topRow"][1].setAttribute("color", currentCube[turnFace]["midRow"][2]);
            cubePreset[turnFace]["topRow"][2].setAttribute("color", currentCube[turnFace]["botRow"][2]);

            cubePreset[turnFace]["midRow"][0].setAttribute("color", currentCube[turnFace]["topRow"][1]);
            cubePreset[turnFace]["midRow"][1].setAttribute("color", currentCube[turnFace]["midRow"][1]);
            cubePreset[turnFace]["midRow"][2].setAttribute("color", currentCube[turnFace]["botRow"][1]);

            cubePreset[turnFace]["botRow"][0].setAttribute("color", currentCube[turnFace]["topRow"][0]);
            cubePreset[turnFace]["botRow"][1].setAttribute("color", currentCube[turnFace]["midRow"][0]);
            cubePreset[turnFace]["botRow"][2].setAttribute("color", currentCube[turnFace]["botRow"][0]);

          }else{//rotate face to right
            cubePreset[turnFace]["topRow"][2].setAttribute("color", currentCube[turnFace]["topRow"][0]);
            cubePreset[turnFace]["midRow"][2].setAttribute("color", currentCube[turnFace]["topRow"][1]);
            cubePreset[turnFace]["botRow"][2].setAttribute("color", currentCube[turnFace]["topRow"][2]);

            cubePreset[turnFace]["topRow"][1].setAttribute("color", currentCube[turnFace]["midRow"][0]);
            cubePreset[turnFace]["midRow"][1].setAttribute("color", currentCube[turnFace]["midRow"][1]);
            cubePreset[turnFace]["botRow"][1].setAttribute("color", currentCube[turnFace]["midRow"][2]);

            cubePreset[turnFace]["topRow"][0].setAttribute("color", currentCube[turnFace]["botRow"][0]);
            cubePreset[turnFace]["midRow"][0].setAttribute("color", currentCube[turnFace]["botRow"][1]);
            cubePreset[turnFace]["botRow"][0].setAttribute("color", currentCube[turnFace]["botRow"][2]);
          }

          let seperateFace = [];

          let borderAlpha = [null,null,null];
          let borderAlphaColors = [null,null,null];

          let borderBeta = [null,null,null];
          let borderBetaColors = [null,null,null];

          let borderCharlie = [null,null,null];
          let borderCharlieColors = [null,null,null];

          let borderDelta = [null,null,null];
          let borderDeltaColors = [null,null,null];

          for(let rows in face){
            for (let i = 0; i < face[rows].length; i++) {
              seperateFace.push(face[rows][i]);
            }
          }

          for(let rows in face){
            for (let i = 0; i < face[rows].length; i++) {
              for (let j = 1; j < face[rows][i].parentNode.childNodes.length; j += 2) {
                if (!seperateFace.includes(face[rows][i].parentNode.childNodes[j])) {
                  let plane = face[rows][i].parentNode.childNodes[j];
                  let position = plane.getAttribute("position");

                  if (turnFace === "top" || turnFace === "bottom") {
                    if (position.x == 1.5) {
                      borderAlpha[2 - (position.z + 1)] = (plane);
                      borderAlphaColors[2 - (position.z + 1)] = (plane.getAttribute("color"));
                    }
                    if (position.z == -1.5) {
                      borderBeta[2 - (position.x + 1)] = (plane);
                      borderBetaColors[2 - (position.x + 1)] = (plane.getAttribute("color"));
                    }
                    if (position.x == -1.5) {
                      borderCharlie[position.z + 1] = (plane);
                      borderCharlieColors[position.z + 1] = (plane.getAttribute("color"));
                    }
                    if (position.z == 1.5) {
                      borderDelta[position.x + 1] = (plane);
                      borderDeltaColors[position.x + 1] = (plane.getAttribute("color"));
                    }
                  }

                  if(turnFace === "front" || turnFace === "back"){
                    if (position.x == 1.5) {
                      borderAlpha[position.y + 1] = (plane);
                      borderAlphaColors[position.y + 1] = (plane.getAttribute("color"));
                    }
                    if (position.y == -1.5) {
                      borderBeta[position.x + 1] = (plane);
                      borderBetaColors[position.x + 1] = (plane.getAttribute("color"));
                    }
                    if (position.x == -1.5) {
                      borderCharlie[2 - (position.y + 1)] = (plane);
                      borderCharlieColors[2 - (position.y + 1)] = (plane.getAttribute("color"));
                    }
                    if (position.y == 1.5) {
                      borderDelta[2 - (position.x + 1)] = (plane);
                      borderDeltaColors[2 - (position.x + 1)] = (plane.getAttribute("color"));
                    }
                  }

                  if(turnFace === "left" || turnFace === "right"){
                    if (position.z == 1.5) {
                      borderAlpha[position.y + 1] = (plane);
                      borderAlphaColors[position.y + 1] = (plane.getAttribute("color"));
                    }
                    if (position.y == -1.5) {
                      borderBeta[position.z + 1] = (plane);
                      borderBetaColors[position.z + 1] = (plane.getAttribute("color"));
                    }
                    if (position.z == -1.5) {
                      borderCharlie[2 - (position.y + 1)] = (plane);
                      borderCharlieColors[2 - (position.y + 1)] = (plane.getAttribute("color"));
                    }
                    if (position.y == 1.5) {
                      borderDelta[2 - (position.z + 1)] = (plane);
                      borderDeltaColors[2 - (position.z + 1)] = (plane.getAttribute("color"));
                    }
                  }

                }
              }
            }
          }

          if (direction === "right") {
            for (let i = 0; i < 3; i++) {
              borderAlpha[i].setAttribute("color",borderDeltaColors[i]);
              borderBeta[i].setAttribute("color",borderAlphaColors[i]);
              borderCharlie[i].setAttribute("color",borderBetaColors[i]);
              borderDelta[i].setAttribute("color",borderCharlieColors[i]);
            }
          }else{
            for (let i = 0; i < 3; i++) {
              borderAlpha[i].setAttribute("color",borderBetaColors[i]);
              borderBeta[i].setAttribute("color",borderCharlieColors[i]);
              borderCharlie[i].setAttribute("color",borderDeltaColors[i]);
              borderDelta[i].setAttribute("color",borderAlphaColors[i]);
            }
          }

          setFaces(cubePreset);
          //update ui
          updateCubeUI(getColors());

        }, rotationSpeed);
      }

      const updateCubeUI = (cube) =>{
        for (let i = 0; i < turnCubeFaces.length; i++) {
          let face = cube[turnCubeFaces[i].getAttribute("data-side")];
          let colors = [];
          let planes = [];

          //get respective colors per face
          for(row in face){
            for(color in face[row]){
              colors.push(face[row][color]);
            }
          }

          //get planes in ui
          for (let j = 1; j < turnCubeFaces[i].childNodes.length; j += 2) {
            planes.push(turnCubeFaces[i].childNodes[j])
          }

          //set plane colors in ui to respective color
          for (let j = 0; j < planes.length; j++) {
            planes[j].setAttribute("color", colors[j])
          }
        }
      }

      const compareCubes = (cube1, cube2) =>{
        for(face in cube1){
          for(row in cube1[face]){
            for(plane in cube1[face][row]){
              if(cube1[face][row][plane] !== cube2[face][row][plane]){
                return false;
              }
            }
          }
        }
        return true;
      }

      const setupLevelFlower = () =>{
        setColors(flowerEndCube);
        let moves = 8;
        let moveCounter = 0;

        rotationSpeed = 100;
        let shuffleHandler = setInterval(()=>{
          if(moveCounter == moves){
            clearInterval(shuffleHandler);
            rotationSpeed = 750;
          }else{
            moveCounter++;

            let showcaseSides = {0:"left",1:"right",2:"front",3:"back",4:"top",5:"bottom"};
            let showcaseRotation = {0:"left",1:"right"};

            let rngSide = Math.floor(Math.random()*6);
            let rngDir = Math.floor(Math.random()*2);

            rotateFace(cubeConfiguration, showcaseSides[rngSide], showcaseRotation[rngDir]);
          }
        }, rotationSpeed * 1.1)
        updateCubeUI(getColors())
      }

      const resetTurnUI = () =>{
        //set arrows invisible + animation
        turnFaceUI.setAttribute("animation__disappear", "property: scale; dur: 750; easing: linear; to: 0 0 0;");
        setTimeout(()=>{turnFaceUI.removeAttribute("animation__disappear");turnFaceUI.setAttribute("visible", "false");}, 750);

        //set plane opaqueness back to normal
        let faces = getFaces();
        for(face in faces){
          for(row in faces[face]){
            for (let j = 0; j < faces[face][row].length; j++) {
              faces[face][row][j].setAttribute("material", "opacity", "1");
              // faces[selectedFace][row][j].parentNode.setAttribute("scale", "1 1 1");
            }
          }
        }
      }

      const pressAnimate = (element, amount) =>{
        let pressAnimation = "property: position; dir: alternate; dur: 400; loop: 2; to: " + element.getAttribute("position").x + " " + (element.getAttribute("position").y - amount) + " " + element.getAttribute("position").z;
        element.setAttribute("animation__press", pressAnimation);
        setTimeout(()=>{
          element.removeAttribute("animation__press");
        },800);
      }

      const addBookcaseProgress = () =>{
        if (progressCounter < progression_books.length) {
          let randomColor = {r: Math.floor(Math.random() * 125 + 50), g: Math.floor(Math.random() * 125 + 50), b: Math.floor(Math.random() * 125 + 50)}
          progression_books[progressCounter].setAttribute("animation__progress", "property: color; dur: 750; easing: linear; from:rgb(255,255,255); to: rgb(" + randomColor.r + ", " + randomColor.g + ", " + randomColor.b + ");");
          progression_books[progressCounter].setAttribute("animation__progress2", "property: material.opacity; dur: 750; easing: linear; from:0; to: 1;");

          progressCounter++;
        }
      }

      const startTimer = () =>{
        let seconds = 0;
        const stopwatch = setInterval(() =>{
          clockTick.play();

          let showMinutes = 0;
          let showSeconds = 0;

          if (Math.floor(seconds/60) < 10){
            showMinutes = "0" + Math.floor(seconds/60);
          }else{
            showMinutes = Math.floor(seconds/60);
          }

          if((seconds%60) < 10){
            showSeconds = "0" + (seconds%60);
          }else{
            showSeconds = (seconds%60);
          }

          timer.setAttribute("value", showMinutes + ":" + showSeconds);
          if(!levelFlowerFinished){
            timeTook = seconds;
          }

          seconds++;
        },1000);

        stopButton.onclick = (event) =>{
          pressAnimate(stopButton, 0.3);
          clearInterval(stopwatch);
          timerRunning = false;
        }
      }

      //timer controls
      startButton.onclick = (event) =>{
        if(timerRunning){return;}
        timerRunning = true;

        pressAnimate(startButton, 0.3);

        let countdownSeconds = 5;
        let seconds = 0;
        const countdown = setInterval(()=>{
          timer.setAttribute("color", "red");
          if (countdownSeconds !== 0) {
            clockTick.play();
            timer.setAttribute("value", countdownSeconds);
            countdownSeconds--;
          }else{
            clearInterval(countdown);
            timer.setAttribute("color", "white");
            timer.setAttribute("value", "00:00");

            startTimer();

            stopButton.onclick = (event) =>{
              pressAnimate(stopButton, 0.3);
              clearInterval(stopwatch);
              timerRunning = false;
            }
          }
        },1000)
      }

          //controls for rotating each cube face
      //selecting face
      for (let i = 0; i < centerFields.length; i++) {
        centerFields[i].onclick = (event) =>{
          //set selected face to face 'facing' the player
          let position = centerFields[i].getAttribute("position");

          switch (centerFields[i].getAttribute("data-rotatation_axis")) {
            case "z":
              if (position.z === 1.5) {
                selectedFace = "front";
              }else{
                selectedFace = "back";
              }
              break;

            case "y":
              if (position.y === 1.5) {
                selectedFace = "top";
              }else{
                selectedFace = "bottom";
              }
              break;

            case "x":
              if (position.x === 1.5) {
                selectedFace = "right";
              }else{
                selectedFace = "left";
              }
              break;
          }


          //handle selection opaqueness/animations/arrows
          let faces = getFaces();
          if (!turnFaceUI.getAttribute("visible")) {
            //set arrows visible/invisible + animation
            turnFaceUI.setAttribute("visible", "true");
            turnFaceUI.setAttribute("animation__appear", "property: scale; dur: 750; easing: linear; to: 1 1 1;");
            setTimeout(()=>{turnFaceUI.removeAttribute("animation__appear");}, 750);

            //make everything
            for(face in faces){
              for(row in faces[face]){
                for (let j = 0; j < faces[face][row].length; j++) {
                  faces[face][row][j].setAttribute("material", "opacity", "0.35");
                }
              }
            }
            //make selected normal
            for(row in faces[selectedFace]){
              for (let j = 0; j < faces[selectedFace][row].length; j++) {
                // faces[selectedFace][row][j].parentNode.setAttribute("scale", "1.1 1.1 1.1");
                for (let k = 1; k < faces[selectedFace][row][j].parentNode.childNodes.length; k += 2) {
                  faces[selectedFace][row][j].parentNode.childNodes[k].setAttribute("material", "opacity", "1");
                }
              }
            }
          }else{
            //set arrows invisible + animation
            turnFaceUI.setAttribute("animation__disappear", "property: scale; dur: 750; easing: linear; to: 0 0 0;");
            setTimeout(()=>{turnFaceUI.removeAttribute("animation__disappear");turnFaceUI.setAttribute("visible", "false");}, 750);

            //set plane opaqueness back to normal
            for(face in faces){
              for(row in faces[face]){
                for (let j = 0; j < faces[face][row].length; j++) {
                  faces[face][row][j].setAttribute("material", "opacity", "1");
                  // faces[selectedFace][row][j].parentNode.setAttribute("scale", "1 1 1");
                }
              }
            }
          }

          if (firstTimeSelectingFace) {//CODE BLOCK FIRST TIME SELECTING CENTER OF FACE
            tutorialbord.setAttribute("animation__tutorial",tutorialShowAnimation);
            explaneLineOne.setAttribute("value","Stap 2:");
            explaneLineTwo.setAttribute("value","Draai zo dat het blauwe vlak compleet is!             HINT: Kijk naar rechts voor je besturings paneel.            Wil je naar een zijde kijk naar dat vlak                  TIP: kijk naar het rechter vlak");
            video.setAttribute("material","shader:gif; src:url(img/Gif_actieEen.gif);opacity:0.8");
            console.log("tutorial click center completed! ");
            firstTimeSelectingFace = false;
          }
        }
      }

      //clicking on arrows
      for (let i = 0; i < turnArrows.length; i++) {
        turnArrows[i].onclick = (event) =>{
          let directions = {front:{left:"left",right:"right"},
                            back:{left:"right",right:"left"},
                            left:{left:"left",right:"right"},
                            right:{left:"right",right:"left"},
                            bottom:{left:"left",right:"right"},
                            top:{left:"right",right:"left"}}

          //rotate face
          rotateFace(cubeConfiguration, selectedFace, directions[selectedFace][turnArrows[i].getAttribute("data-direction")]);

          //animate arrows
          let animationDirection = {left: "0 180 -20", right: "0 180 20"};
          let animationString = "property: rotation; dur: 400; dir: alternate; loop: 2; easing: linear; to: " + animationDirection[directions[selectedFace][turnArrows[i].getAttribute("data-direction")]];
          turnArrows[i].setAttribute("animation__clicked", animationString);
          setTimeout(()=>{
            turnArrows[i].removeAttribute("animation__clicked");
          },1000);

          //if in tutorial, check if current state matches end state
          setTimeout(()=>{
            if (tutorial) {
              if (compareCubes(getColors(), tutorials[tutorialStep].end)) {
                console.log("tutorial " + tutorialStep + " completed!");
                if (tutorialStep < 3) { //INCREMENT TUTORIAL COUNTER
                  video.setAttribute("material","shader:gif; src:url(img/Gif_actie"+ (tutorialStep+1) + ".gif);opacity:0.8");
                  explaneLineOne.setAttribute("value","Stap "+ (tutorialStep+2) + ":");
                  explaneLineTwo.setAttribute("value", kleurenlijst[tutorialStep-1]);
                  tutorialStep++;
                }else{  //CODEBLOCK IF TUTORIAL FINISHED
                  explaneLineOne.setAttribute("value","Tutorial is compleet!");
                  explaneLineTwo.setAttribute("value","Je hebt het super goed gedaan.                           Draai je nu om voor het ECHTE spel");
                  tutorialbord.setAttribute("animation__tutorial",tutorialRemoveAnimation);
                  tutorial = false;
                  flower = true;
                  resetTurnUI();
                  setTimeout(()=>{setupLevelFlower();},10000);
                  return;
                }
                //RESET CUBE + PREPARE NEXT TUTORIAL STEP

                //rotate front to facing player
                cube.setAttribute("animation__rotateCubeBack","property:rotation;to:0 0 0;easing:linear;dur:1500;");
                resetTurnUI();

                //set cube to begin state next step
                setTimeout(()=>{
                  setColors(tutorials[tutorialStep].begin);
                  updateCubeUI(getColors());

                  //remove animation
                  cube.removeAttribute("animation__rotateCubeBack");
                },2000);
              }
            }
            if (flower){
              if(!timerRunning){
                timerRunning = true;
                startTimer();
              }

              addBookcaseProgress();
              if(compareCubes(getColors(), flowerEndCube)){ //CODE BLOCK FINISHED LEVEL 1
                celebration.play();
                console.log("level 1 completed!");
                explaneLineOne.setAttribute("value","Level 1 is gelukt!");
                explaneLineTwo.setAttribute("value","Je hebt het geweldig gedaan.  Het oplossen duurde je " + timeTook + " secondes! In deze tijd heeft " + fastest_person + " " + Math.floor(timeTook / parseInt(fastest_time)) + " kubussen opgelost!");
                // hoe snel heb je gedaan
                //Audio??
              }
            }
          }, rotationSpeed*1.1)

        }
      }

      //rotating face
      for (let i = 0; i < turnCubeFacePlanes.length; i++) {
        turnCubeFacePlanes[i].onclick = (event) =>{
          let rotations = {front: "0 0 0", back: "0 180 0",
                          left: "0 90 0", right: "0 270 0",
                          top: "90 0 0", bottom: "270 0 0"};

          cube.setAttribute("animation__turnCube", "property: rotation; dur: 750; easing:linear; to: " + rotations[turnCubeFacePlanes[i].parentNode.getAttribute("data-side")]);
          setTimeout(()=>{cube.removeAttribute("animation__turnCube")},800);

          //set arrows invisible + animation
          turnFaceUI.setAttribute("animation__disappear", "property: scale; dur: 750; easing: linear; to: 0 0 0;");

          //add animation to plane
          for (let j = 1; j < turnCubeFacePlanes[i].parentNode.childNodes.length; j += 2) {
            turnCubeFacePlanes[i].parentNode.childNodes[j].setAttribute("animation__clicked", "property: scale; dur: 325; dir: alternate; loop: 2; to: 0.5 0.5 0.5;");
          }

          //remove animations
          setTimeout(()=>{
            turnFaceUI.removeAttribute("animation__disappear");
            turnFaceUI.setAttribute("visible", "false");

            for (let j = 1; j < turnCubeFacePlanes[i].parentNode.childNodes.length; j += 2) {
              turnCubeFacePlanes[i].parentNode.childNodes[j].removeAttribute("animation__clicked");;
            }
        }, 750);

          resetTurnUI();

        }
      }

      let cubeConfiguration = getFaces();
      //========= SHOWCASE =================
      // let showcaseSides = {0:"left",1:"right",2:"front",3:"back",4:"top",5:"bottom"};
      // let showcaseRotation = {0:"left",1:"right"};
      //
      // let shuffle = 100
      // let shuffleCount = 0
      // let moves = [];
      //
      // rotationSpeed = 50;
      // let shuffleHandler = setInterval(()=>{
      //   if(shuffleCount === shuffle){
      //     clearInterval(shuffleHandler);
      //
      //     rotationSpeed = 200;
      //     let solveCount = shuffle - 1;
      //     let solveHandler = setInterval(()=>{
      //       if (solveCount < 0) {
      //         clearInterval(solveHandler);
      //       }else{
      //         rotateFace(cubeConfiguration, moves[solveCount].face, showcaseRotation[(1- moves[solveCount].dir)]);
      //         solveCount--;
      //       }
      //     }, rotationSpeed * 1.1)
      //   }else{
      //     shuffleCount++;
      //     let rngSide = Math.floor(Math.random()*6);
      //     let rngDir = Math.floor(Math.random()*2);
      //
      //     rotateFace(cubeConfiguration, showcaseSides[rngSide], showcaseRotation[rngDir]);
      //
      //     moves.push({face:showcaseSides[rngSide], dir:rngDir});
      //   }
      //
      // }, rotationSpeed * 1.1)

      // ========= SETUP ================

      setColors(tutorials[tutorialStep].begin);
      updateCubeUI(getColors());

}
