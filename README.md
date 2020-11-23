# AppCo_back-end

### 1. user statistic list:

    GET /users/statistic?page&limit,

    ex. localhost:3000/users/statistic   (default: page=0, limit=50),
    localhost:3000/users/statistic?page=1&limit=40

### 2. user statistic by userId:

    GET /users/statistic/:userId?dateFrom="YYYY-MM-DD"&dateTo="YYYY-MM-DD",

    ex. localhost:3000/users/statistic/100,
    localhost:3000/users/statistic/100?dateFrom="2019-10-9"&dateTo="2019/10/10"
