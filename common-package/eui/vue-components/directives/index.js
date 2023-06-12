export const focus = {
  mounted: (el) => el.focus()
}

export const tooltip = {
  mounted(el, binding) {
    const docBody = document.body
    let tooltip = document.createElement('div')
    let text = document.createTextNode(binding.value)
    let svg = `<svg width="66" height="62" style="position: absolute; left: 50%; bottom: -43px; transform:translateX(-50%)"><path  d="M33 25L28 19H38L33 25Z" fill="var(--tooltip--bg)"/><svg>`
    tooltip.innerHTML = svg
    tooltip.appendChild(text)
    tooltip.classList.add('eui-tooltip')

    el.onmouseenter = function () {
      let { left, top, width } = el.getBoundingClientRect()
      docBody.appendChild(tooltip)

      tooltip.style.left = `${left + width / 2 - tooltip.clientWidth / 2}px`
      tooltip.style.top = `${top - 32}px`
    }

    el.onmouseleave = function () {
      docBody.removeChild(tooltip)
    }
  }
}