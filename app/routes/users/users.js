const KoaRouter = require('koa-router')

const router = new KoaRouter( {
    prefix: '/api'
})

router.get('/users', async (ctx) => {
    const users = [
        { id: 1, name: 'John Doe', email: 'john.doe@example.com' },
        { id: 2, name: 'Jane Doe', email: 'jane.doe@example.com' },
    ];
    ctx.body = users;
});

module.exports = router