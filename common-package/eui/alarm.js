import { insertCss } from "./insert-css"

let idStart = 0
let timer = null

function startAlarm(timeout = 10 * 1000) {
  endAlarm()
  clearTimeout(timer)
  var id = 'fullscreen-alarm-' + idStart
  var t = /* html */`
    <div class="fullscreen-alarm" id="${id}">
      <div class="fullscreen-alarm__mask"></div>
    </div>
  `
  idStart++
  document.body.insertAdjacentHTML('beforeend', t)
  timer = setTimeout(() => {
    endAlarm()
  }, timeout)
}


function endAlarm() {
  let els = document.querySelectorAll('.fullscreen-alarm')
  for (const el of els) {
    document.body.removeChild(el)
  }
}

insertCss(/*css*/`
  .fullscreen-alarm {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    background: rgba(0,0,0,0);
    box-shadow: inset 0 0 80px rgba(255,10,10, 1);
    z-index: 301;
    animation: flash 1s infinite alternate forwards;
    pointer-events: none; 
  }
  .fullscreen-alarm__mask {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
  }
  @keyframes flash {
    from {
      opacity: 0;
    }
    to {
      opacity: 1
    }
  }
`)



export {
  startAlarm,
  endAlarm
}
