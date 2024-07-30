export const EnvConfiguration = () => ({
  
    enviroment: process.env.NODE_ENV || 'dev',
    mongodb: process.env.MONGODB,
    port: process.env.PORT || 3000,
    defaultLimit: +process.env.DEFAULT_LIMIT || 5,
    defaultOffset: +process.env.DEFAULT_OFFSET || 0,
    jwtSecret: process.env.JWT_SECRET,
    jwtExpirationTime: process.env.JWT_EXPIRATION_TIME,
    jwtRenew: process.env.JWT_RENEW,
    googleClientId: process.env.GOOGLE_CLIENT_ID,
    googleSecret: process.env.GOOGLE_SECRET
    
})