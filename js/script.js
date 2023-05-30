"use strict";

// Variables 

const startBtn = document.querySelector(".status");
const boxs = document.querySelectorAll(".box");
const boxArr = ["green", "red", "yellow", "blue"];
const nextAudio = document.querySelector(".next-audio");
const loseAudio = document.querySelector(".lose-audio");
let arr;
let randomBox;
let count; 
let newArr;

// Functions 

function startGame () {
    arr = [];
    newArr = [];
    count = 0;
    startBtn.style.animation = "anim 0.3s alternate infinite";
    document.addEventListener("keyup", () => {
        startBtn.textContent = `Score: ${count}`;
        startBtn.style.animation = "none";
        start();
    }, {once: true});
}

function start () {
    boxs.forEach(box => {
        box.addEventListener("click", function () {
            clickBtn(box);
            newArr.push(box.classList[1]);
            checkBox();
        });
    });
    addNewBox();
}

function addNewBox () {
    randomBox = Math.floor(Math.random() * (4 - 0) + 0);
    let box = boxs[randomBox]; 
    clickBtn(box);
    arr.push(boxArr[randomBox]);
}

function clickBtn (box) {
    nextAudio.play();
    box.style.cssText += `
        animation: boxShadow 1s alternate infinite;
    `;
    setTimeout(() => {
        box.style.cssText += `
        animation: none;
    `;  
    }, 500);
}

function checkBox () {
    for (let i = 0; i < newArr.length; i++) {
        if (arr[i] !== newArr[i]) {
            startBtn.textContent = `oops, wrong button!`;
            document.body.style.background = "red";
            loseAudio.play();
            setTimeout(() => {
                document.body.style.background = "#071c3a";
            },100);
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        } else {
            if (newArr.length === arr.length) {
                for (let i = 0; i < newArr.length; i++) {
                    if (newArr[i] !== arr[i]) {
                        startBtn.textContent = `oops, wrong button!`;
                        document.body.style.background = "red";
                        loseAudio.play();
                        setTimeout(() => {
                            document.body.style.background = "#071c3a";
                        },100);
                        setTimeout(() => {
                            window.location.reload();
                        }, 500);
                    }
                }
                newArr = [];
                count++;
                startBtn.textContent = `Score: ${count}`;
                setTimeout(() => {
                    addNewBox();
                }, 1000);
            }
        }   
    }
}

startGame();




