// import NormalizeWheel from 'normalize-wheel'

import Home from './pages/Home'

/**
 * App Class
 */
class App {
  constructor() {
    console.log(
      '%c\t===\t Boilerplate Start \t===\t',
      'background: #fff5e4; color: #420',
    )

    this.createContent()

    this.createPages()

    this.addEventListeners()
    this.addLinkListeners()

    this.onResize()
  }

  /**
   * Initializiations
   */
  createContent() {
    this.content = document.querySelector('.content')
    this.template = this.content.getAttribute('data-template')
  }

  createPages() {
    this.pages = {
      home: new Home(),
    }

    this.page = this.pages[this.template]
    this.page.create()
  }

  /**
   * onPopState Event
   */
  onPopState() {
    this.onChange({
      url: window.location.pathname,
      push: false,
    })
  }

  /**
   * onChange Method
   * -> Called whenever a navigation action occurs
   *
   * @param {string} url New page path
   * @param {boolean} push flag to control "pushstate" behaviour
   */
  async onChange({ url, push = true }) {
    // this.canvas.onChangeStart(this.template, url)

    await this.page.hide()

    const request = await window.fetch(url)

    if (request.status === 200) {
      const html = await request.text()
      const div = document.createElement('div')

      if (push) {
        window.history.pushState({}, '', url)
      }

      div.innerHTML = html

      const divContent = div.querySelector('.content')

      this.template = divContent.getAttribute('data-template')

      //   this.navigation.onChange(this.template)

      this.content.setAttribute('data-template', this.template)
      this.content.innerHTML = divContent.innerHTML

      //   this.canvas.onChangeEnd(this.template)

      this.page = this.pages[this.template]
      this.page.create()

      this.onResize()

      this.page.show()

      this.addLinkListeners()
    } else {
      this.onChange({ url: '/' })
    }
  }

  onResize() {
    if (this.page && this.page.onResize) {
      this.page.onResize()
    }
  }

  /**
   * Listeners
   */
  addEventListeners() {
    window.addEventListener('popstate', this.onPopState.bind(this))
    window.addEventListener('resize', this.onResize.bind(this))
    // window.addEventListener('mousewheel', this.onWheel.bind(this))

    // window.addEventListener('mousedown', this.onTouchDown.bind(this))
    // window.addEventListener('mousemove', this.onTouchMove.bind(this))
    // window.addEventListener('mouseup', this.onTouchUp.bind(this))

    // window.addEventListener('touchstart', this.onTouchDown.bind(this))
    // window.addEventListener('touchmove', this.onTouchMove.bind(this))
    // window.addEventListener('touchend', this.onTouchUp.bind(this))
  }

  addLinkListeners() {
    const links = document.querySelectorAll('a')

    links.forEach((link) => {
      link.onclick = (event) => {
        event.preventDefault()

        const { href } = link

        this.onChange({ url: href })
      }
    })
  }
}

/* eslint-disable no-new */
new App()
