const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

// Параметры для настройки стратегии JWT
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'importantsecret', // Замените на свой секретный ключ
};

passport.use(
    new JwtStrategy(jwtOptions, (jwtPayload, done) => {
        // Здесь можно выполнить дополнительные проверки или запросы к базе данных, если необходимо
        // jwtPayload содержит информацию из JWT-токена (например, id пользователя)
        // Проверьте, существует ли пользователь или выполните другие необходимые действия.

        // Пример: Проверка наличия пользователя в базе данных
        if (jwtPayload.id) {
            // Если пользователь существует, передайте его дальше
            return done(null, jwtPayload);
        } else {
            // Если пользователь не найден, верните ошибку
            return done(null, false);
        }
    })
);

module.exports = passport;
