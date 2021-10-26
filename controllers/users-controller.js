const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./../models/user-model');

const createUserFromData = async (response, user) => {
  if (!user.name) {
    return {
      ok: false,
      error: 'Falta nombre',
      status: 400,
    };
  }

  if (!user.email) {
    return {
      ok: false,
      error: 'Falta correo',
      status: 400,
    };
  }

  if (!user.withGoogle && !user.password) {
    return {
      ok: false,
      error: 'Falta contraseña',
      status: 400,
    };
  }

  let encryptedPassword;
  if (!user.withGoogle) {
    const salt = bcrypt.genSaltSync();
    encryptedPassword = bcrypt.hashSync(user.password, salt);
  }

  const existingUser = await User.findOne({ email: user.email });
  if (existingUser && existingUser._id) {
    return {
      ok: false,
      error: 'El usuario ya está registrado',
      status: 302,
      user: existingUser,
    };
  }

  const newUser = new User({
    ...user,
    password: encryptedPassword,
  });
  newUser.save((error, result) => {
    if (error) {
      return { error, status: 500 };
    }
    return result;
  });
};

// POST
const createUser = async (request, response) => {
  const user = request.body;
  const resultado = await createUserFromData(response, user);
  //return response.status(resultado.status || 200).send(resultado);
  return response.status(200).send(resultado);
};

// GET
const readUsers = (request, response) => {
  const id = request.params.id;

  const filter = {};
  if (id) {
    filter._id = id;
  }

  User.find(filter, (error, result) => {
    if (error) {
      return response.status(500).send({ error });
    }
    return response.send(result);
  });
};

const readUserData = async (request, response) => {
  const user = await User.findOne({ _id: request.userId });
  if (user) {
    return response.send(user);
  }
  return response.status(404).send({ error: 'No existe el usuario' });
};

const authUser = async (request, response) => {
  // 1. validar que el usuario exista
  const user = request.body;
  const userFromDb = await User.findOne({ email: user.email });
  if (userFromDb) {
    // 2. validar que la contraseña sea correcta
    const isValid = userFromDb.withGoogle
      ? true
      : bcrypt.compareSync(user.password || '', userFromDb.password);

    if (!isValid) {
      return response.status(401).send({
        ok: false,
        error: 'Usuario no autorizado',
      });
    }

    // 3. generar un token
    const token = jwt.sign({ id: userFromDb._id }, process.env.JWT_SECRET, {
      expiresIn: '3h',
    });
    return response.send({ ok: isValid, token });
  }

  return response.status(404).send({
    ok: false,
    error: 'El usuario no está registrado',
  });
};

const authWithGoogle = async (request, response) => {
  try {
    const tokenFromHeader = request.header('organicfashion-auth-user');
    const ticket = await client.verifyIdToken({
      idToken: tokenFromHeader,
      audience: process.env.CLIENT_ID,
    });
    const payload = ticket.getPayload();
    if (!payload.sub) {
      return response.status(401).send({
        ok: false,
        error: 'Usuario no autorizado!',
      });
    }
    const user = {
      name: payload.name,
      email: payload.email,
      withGoogle: true,
    };
    const resultado = await createUserFromData(response, user);
    const status = resultado.status || 200;
    if (status === 302 || status === 200) {
      const userId = resultado._id || resultado.user._id;
      if (!userId) {
        return response.status(401).send({
          ok: false,
          error: 'Usuario no autorizado',
        });
      }

      // 3. generar un token
      const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: '1h',
      });
      return response.send({
        ok: true,
        token,
        email: user.email,
      });
    }
    return response.status(401).send({
      ok: false,
      error: 'Usuario no autorizado',
    });
  } catch (e) {
    return response.status(500).send({
      ok: false,
      error: e.message,
    });
  }
};

//Patch
const updateUser = (request,response) => {
  const id = request.params.id;
  if (!id){
      return response.status(400).send({ error: 'No existe el usuario'});
  }

  User.updateOne({ _id:id }, request.body, (error, result) => {
      if (error){
          return response.status(500).send({ error });
      }

      User.find({ _id:id }, (error, result) => {
          if (error){
              return response.status(500).send({ error })
          }
          return response.send(result);
      });


      //return response.send(result);
  });

};

//Delete
const deleteUser = (request, response) => {
  const id = request.params.id;
  if (!id){
      return response.status(400).send({ error: 'No existe el usuario para eliminar'});
  }

  User.remove({ _id:id }, (error, result) => {
      if (error){
          return response.status(500).send({ error });
      }
      return response.send(result);

  });

};

module.exports = {
  createUser,
  readUsers,
  readUserData,
  updateUser,
  deleteUser,
  authUser,
  authWithGoogle,
};