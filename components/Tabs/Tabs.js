class TabAccordion {
  static of(element) {
    return new TabAccordion(element)
  }

  static getAllTabs() {
    return document.querySelectorAll('.tabs-link')
  }

  static getTotalTabs() {
    return this.getAllTabs().length
  }

  get selectedTab() {
    return this._selectedTab
  }

  set selectedTab(tab) {
    this._selectedTab = tab
  }
  
  constructor(element) {
    this.element = element
    this.tabsLinksElements = Array.from(this.element.querySelectorAll('.tabs-link'))
    this.tabsLinks = this.tabsLinksElements.map(TabLink.of)
    this._selectedTab = this.tabsLinks[0]
    this.element.addEventListener('click', this.select.bind(this))
  }

  select(event) {
    this.selectedTab.deselect()
    this.selectedTab.tabItem.deselect()
    this.selectedTab = this.tabsLinks.find(el => el.element === event.target)
    this.selectedTab.element.classList.add('tabs-link-selected')
    this.selectedTab.itemElement.classList.add('tabs-item-selected')
  }
}

class TabLink {
  static of (element) {
    return new TabLink(element)
  }

  constructor(element) {
    // Assign this.element to the passed in DOM element
    this.element = element
    
    // Using the custom data attribute get the associated Item element
    this.itemElement = document.querySelector(`.tabs-item[data-tab='${this.element.dataset.tab}']`)
    
    // Using the Item element, create a new instance of the TabItem class
    this.tabItem = TabItem.of(this.itemElement)
  }

  deselect() {
    this.element.classList.remove('tabs-link-selected')
  }
}

class TabItem {
  static of(element) {
    return new TabItem(element)
  }

  constructor(element) {
    // Assign this.element to the passed in element
    this.element = element
  }

  deselect() {
    this.element.classList.remove('tabs-item-selected')
  }
}

/* START HERE: 

- Select all classes named ".tabs-link" and assign that value to the links variable

- With your selection in place, now chain a .forEach() method onto the links variable to iterate over the DOM NodeList

- In your .forEach() method's callback function, return a new instance of TabLink and pass in each link as a parameter

*/

// const links = document.querySelectorAll('.tabs-link')
// links.forEach(convertToTabLink)
const tabs = document.querySelectorAll('.tabs-links')
tabs.forEach(convertToTabAccordion)

function convertToTabAccordion(tab) {
  return TabAccordion.of(tab)
}