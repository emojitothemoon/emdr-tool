let animation, timerInterval;
let timeElapsed = 0;

function startEMDR() {
    stopEMDR();
    
    let speed = document.getElementById("speed").value;
    let duration = document.getElementById("duration").value;
    let ball = document.querySelector(".ball");
    
    let speedMs = (60 / speed) * 1000;
    let direction = 1;
    
    function moveBall() {
        let screenWidth = document.querySelector(".screen").clientWidth - 30;
        let startTime = Date.now();

        function step() {
            let elapsed = Date.now() - startTime;
            let progress = elapsed / speedMs;

            ball.style.left = (direction > 0 ? progress : 1 - progress) * screenWidth + "px";

            if (progress >= 1) {
                direction *= -1;
                startTime = Date.now();
            }

            animation = requestAnimationFrame(step);
        }

        step();
    }

    moveBall();
    
    // ตั้งเวลานับถอยหลัง
    timeElapsed = 0;
    document.getElementById("timer").textContent = `เวลาที่ผ่านไป: ${timeElapsed} วินาที`;
    
    timerInterval = setInterval(() => {
        timeElapsed++;
        document.getElementById("timer").textContent = `เวลาที่ผ่านไป: ${timeElapsed} วินาที`;
        
        if (timeElapsed >= duration) {
            stopEMDR();
        }
    }, 1000);
}

function pauseEMDR() {
    cancelAnimationFrame(animation);
    clearInterval(timerInterval);
}

function stopEMDR() {
    cancelAnimationFrame(animation);
    clearInterval(timerInterval);
    document.querySelector(".ball").style.left = "0";
    document.getElementById("timer").textContent = "เวลาที่ผ่านไป: 0 วินาที";
}
