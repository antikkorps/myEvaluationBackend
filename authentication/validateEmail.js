function validateEmail(req, res, next) {
  //Regex found in https://regexr.com/3e48o
  const regex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/
  const { email } = req.body

  if (!regex.test(email)) {
    return res.status(400).json({ message: "Merci de saisir un email valide !" })
  }

  next()
}

function validatePassword(req, res, next) {
  const { password } = req.body

  if (password.length < 8) {
    return res
      .status(400)
      .json({ message: "Le mot de passe doit contenir au moins 8 caractères." })
  }

  if (!/[A-Z]/.test(password)) {
    return res
      .status(400)
      .json({ message: "Le mot de passe doit contenir au moins une lettre majuscule." })
  }

  if (!/[a-z]/.test(password)) {
    return res
      .status(400)
      .json({ message: "Le mot de passe doit contenir au moins une lettre minuscule." })
  }

  if (!/[0-9]/.test(password)) {
    return res
      .status(400)
      .json({ message: "Le mot de passe doit contenir au moins un chiffre." })
  }

  if (!/[!@#$%^&*]/.test(password)) {
    return res
      .status(400)
      .json({ message: "Le mot de passe doit contenir au moins un caractère spécial." })
  }

  next()
}

module.exports = { validateEmail, validatePassword }
