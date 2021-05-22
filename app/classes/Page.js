import gsap from 'gsap'
import Prefix from 'prefix'
import each from 'lodash/each'
import map from 'lodash/map'

import Title from 'animations/Title'

export default class Page {
  constructor({ id, elements, element }) {
    this.selector = element
    this.selectorChildren = {
      ...elements,

      // animationsParagraphs: '[data-animation="paragraph"]',
      animationsTitles: '[data-animation="title"]',

      preloaders: '[data-src]',
    }

    this.id = id

    this.transformPrefix = Prefix('transform')
  }

  create() {
    this.element = document.querySelector(this.selector)
    this.elements = {}

    this.scroll = {
      current: 0,
      target: 0,
      last: 0,
      limit: 0,
    }

    each(this.selectorChildren, (entry, key) => {
      if (
        entry instanceof window.HTMLElement ||
        entry instanceof window.NodeList ||
        Array.isArray(entry)
      ) {
        this.elements[key] = entry
      } else {
        this.elements[key] = document.querySelectorAll(entry)

        if (this.elements[key].length === 0) {
          this.elements[key] = null
        } /*
        else if (this.elements[key].length === 1) {
          this.elements[key] = document.querySelector(entry)
        } */
      }
    })

    this.createAnimations()
  }

  createAnimations() {
    this.animations = []

    // Titles
    this.animationsTitles = map(
      this.elements.animationsTitles,
      (element) => {
        return new Title({
          element,
        })
      },
    )

    this.animations.push(...this.animationsTitles)
  }

  /**
   * Show Page Animation
   *
   * @returns {Promise} on animation end
   */
  show() {
    return new Promise((resolve) => {
      this.animationIn = gsap.timeline()

      this.animationIn.fromTo(
        this.element,
        {
          autoAlpha: 0,
        },
        {
          autoAlpha: 1,
        },
      )

      this.animationIn.call(() => {
        this.addEventListeners()

        resolve()
      })
    })
  }

  /**
   * Hide Page Animation
   *
   * @returns {Promise} on animation end
   */
  hide() {
    return new Promise((resolve) => {
      this.destroy()

      this.animationOut = gsap.timeline()

      this.animationOut.to(this.element, {
        duration: 0.3,
        autoAlpha: 0,
        onComplete: resolve,
      })
    })
  }

  /**
   * Events
   */
  onResize() {
    if (this.elements.wrapper) {
      this.scroll.limit =
        this.elements.wrapper.clientHeight - window.innerHeight
    }

    each(this.animations, (animation) => animation.onResize())
  }

  onWheel({ pixelY }) {
    this.scroll.target += pixelY
  }

  addEventListeners() {}

  removeEventListeners() {}

  destroy() {
    this.removeEventListeners()
  }
}
