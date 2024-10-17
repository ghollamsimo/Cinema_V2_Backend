import request from 'supertest'
import SalleService from "../services/SalleService.mjs";
import {describe, test} from "jest-circus";

describe("GET /salle/index ", () => {
    test('should return all salles', async () => {
        return request(SalleService.index())
            .get('/salle/index')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })
})