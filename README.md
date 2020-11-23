# AppCo_back-end

### 1. user statistic list:

    get /users/statistic?page&limit,

    <br />
    ex. localhost:3000/users/statistic?page=1&limit=40

### 2. user statistic by userId:

    get /users/statistic/:userId?dateFrom="YYYY-MM-DD"&dateTo="YYYY-MM-DD",

    <br />
    ex. localhost:3000/users/statistic/1?dateFrom="2019-10-9"&dateTo="2019/10/10"
