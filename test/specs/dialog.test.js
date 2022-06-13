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
})
