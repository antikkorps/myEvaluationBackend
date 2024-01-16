function validateEmail(req, res, next) {
  //Regex found in https://regexr.com/3e48o
  const regex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/
  const { email } = req.body

  if (!regex.test(email)) {
    return res.status(400).json({ message: "Merci de saisir un email valide !" })
  }

  next()
}

module.exports = { validateEmail }
