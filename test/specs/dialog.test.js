const dialog = require('../../pageObjects/dialog.page')
const expect = require('chai').expect

describe('Dialog', () => {
  it('Verify that the text entry dialog username & password fields are editable', async () => {
    await dialog.appBtn.click()
    await dialog.alertDialogBtn.click()
    await dialog.textEntryDialogBtn.click()

    await dialog.userNameField.addValue('Hi There')
    await dialog.userNameField.clearValue()
    await dialog.userNameField.addValue('Hello There')
    await dialog.passwordField.clearValue()
    await dialog.passwordField.addValue('General Kenobi')

    const text = await dialog.userNameField.getText()
    expect(text).equal('Hello There')

    await dialog.dialogOkBtn.click()
  })

  it('Verify that the app adjust when orientation is switched', async () => {
    await driver.setOrientation('LANDSCAPE')
    await driver.saveScreenshot('./screenshots/landscape.png')
    expect(await dialog.orientation).equal('LANDSCAPE')

    await driver.setOrientation('PORTRAIT')
    await driver.saveScreenshot('./screenshots/portrait.png')
    expect(await dialog.orientation).equal('PORTRAIT')
  })

  it('Verify the repeat alarm option has attribute checked set to true when selected', async () => {
    await dialog.appBtn.click()
    await dialog.alertDialogBtn.click()
    await dialog.repeatAlarmBtn.click()

    const text = await dialog.weekdayCheckbox(0).getText()
    expect(text).equal('Every Monday')

    expect(await dialog.isChecked(0)).equal('false')

    await dialog.weekdayCheckbox(0).click()
    expect(await dialog.isChecked(0)).equal('true')
  })

  it('Verify isEnabled & isDisplayed', async () => {
    await dialog.viewBtn.click()
    await driver.touchAction([
      { action: 'press', x: 500, y: 1400 },
      { action: 'moveTo', x: 500, y: 300 },
      'release',
      { action: 'press', x: 500, y: 1400 },
      { action: 'moveTo', x: 500, y: 300 },
      'release',
      { action: 'press', x: 500, y: 1400 },
      { action: 'moveTo', x: 500, y: 300 },
      'release'
    ])

    await dialog.tabsBtn.click()
    await dialog.contentByIdBtn.click()

    for await (const tab of dialog.tabs) {
      await tab.click()

      expect(await tab.isEnabled()).equal(true)
      expect(await tab.isDisplayed()).equal(true)
    }
  })

  afterEach(() => {
    driver.reset()
  })
})
