// Bibliotecas e Frameworks
const supertest = require('supertest')
const userId = 173312201
const username = 'fulaninho'

// Em JavaScript, Classe é opcional e pode ser agrupado em um Describe
describe('PetStore Swagger - User', () =>{

    // Atributos do grupo/describe
    const request = supertest('https://petstore.swagger.io/v2') // BaseURL
    const user = require('../../vendors/json/user.json')
    const userPut = require('../../vendors/json/userPut.json')
    const massa1 = require('../../vendors/json/massaUser')

    // Funções ou Métodos: Its
    it('POST User', () =>{
        return request
            .post('/user')            // endpoint
            .send(user)               // enviar json do user
            .then((res) => {          // o ponto no início significa que é uma continuação do request
                expect(res.statusCode).toBe(200)
                expect(res.body.message).toBe(String(userId))
                expect(res.body.type).toBe('unknown')
                expect(res.body.code).toBe(200)
            })
    })

    it.each(massa1.array.map(elemento => [
        elemento.id,
        elemento.username,
        elemento.firstName,
        elemento.lastName,
        elemento.email,
        elemento.password,
        elemento.phone,
        elemento.userStatus
    ]))
        ('POST User Data Driven simples %s', (id, username, firstName, lastName, email, password, phone, userStatus) =>{    // %s para trazer o nome do primeiro campo (se colocasse %s %s traria os dois primeiros campos)
        user.id = id        // para substituir o nome que está no json
        return request
            .post('/user')            // endpoint
            .send(user)               // enviar json do user
            .then((res) => {          // o ponto no início significa que é uma continuação do request
                expect(res.statusCode).toBe(200)
                expect(res.body.message).toBe(String(id))
                expect(res.body.type).toBe('unknown')
                expect(res.body.code).toBe(200)
            })
        })

    it('GET User', () => {
        return request
            .get('/user/' + username)      // .get(`/user/${username}`)    moderno template literals
            .then((res) =>{
                expect(res.body.id).toBe(userId)
                expect(res.body.username).toBe('fulaninho')
                expect(res.body.firstName).toBe('fulano')
                expect(res.body.lastName).toBe('de tal')
                expect(res.body.email).toBe('fulaninho@gmail.com')
                expect(res.body.password).toBe('fulaninho123')
                expect(res.body.phone).toBe('21931229999')
                expect(res.body.userStatus).toBe(1)
                expect(res.statusCode).toBe(200)
            })
    })

    it('PUT User', () => {
        return request
            .put('/user/' + username)
            .send(userPut)
            .then((res) =>{
                expect(res.statusCode).toBe(200)
                expect(res.body.message).toBe(String(userPut.id))
                expect(res.body.type).toBe('unknown')
                expect(res.body.code).toBe(200)
            })
    })

    it('DELETE User', () => {
        return request
            .delete(`/user/${username}`)
            .then((res) => {
                expect(res.statusCode).toBe(200)
                expect(res.body.message).toBe(username)
                expect(res.body.type).toBe('unknown')
                expect(res.body.code).toBe(200)
            })
    })
    massa1.array.forEach(({ id, username, firstName, lastName, email, password, phone, userStatus }) => {
        massa1.id = id        // para substituir o nome que está no json
        it(`POST User Data Driven forEach - ${username}`, () => {
                 return request
                    .post('/user')            // endpoint
                    .send(user)               // enviar json do user
                    .then((res) => {          // o ponto no início significa que é uma continuação do request
                        expect(res.statusCode).toBe(200)
                        expect(res.body.message).toBe(String(id))
                        expect(res.body.type).toBe('unknown')
                        expect(res.body.code).toBe(200)
                    })
        })

        it(`GET User Data Driven forEach - ${username}`, () => {
            return request
                .get('/user/' + username)      // .get(`/user/${username}`)    moderno template literals
                .then((res) =>{
                    expect(res.body.id).toBe(id)
                    expect(res.body.username).toBe(username)
                    expect(res.body.firstName).toBe(firstName)
                    expect(res.body.lastName).toBe(lastName)
                    expect(res.body.email).toBe(email)
                    expect(res.body.password).toBe(password)
                    expect(res.body.phone).toBe(phone)
                    expect(res.body.userStatus).toBe(userStatus)
                    expect(res.statusCode).toBe(200)
                })
        })

        it(`PUT User Data Driven forEach - ${username}`, () => {
            return request
                .put('/user/' + username)
                .send(userPut)
                .then((res) =>{
                    expect(res.statusCode).toBe(200)
                    expect(res.body.message).toBe(String(id))
                    expect(res.body.type).toBe('unknown')
                    expect(res.body.code).toBe(200)
                })
        })

        it(`DELETE User Data Driven forEach - ${username}`, () => {
            return request
                .delete(`/user/${username}`)
                .then((res) => {
                    expect(res.statusCode).toBe(200)
                    expect(res.body.message).toBe(userPut.username)
                    expect(res.body.type).toBe('unknown')
                    expect(res.body.code).toBe(200)
                })
        })
    })
})