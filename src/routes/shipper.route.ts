import { FastifyInstance } from 'fastify'
import ShipperUsecase from '../usecase/shipper.usecase'
import responseHandler from '../helper/response.handler'
import { createDTO, confirmedEmailDTO,  deleteDTO/* , updateDTO */ } from '../entities/dtos/shipper.dto'
import * as Validator from '../helper/validate.helper'
import { isIdentifier } from 'typescript'

class TodoRoutes {
  public prefix_route = '/shipper'

  async routes(fastify: FastifyInstance) {

    // fastify.get(`/findall`, async (request, reply) => {
    //   responseHandler(async () => {
    //     const data = await TodoUsecase.findAllTodo()
    //     return data
    //   }, reply)
    // })

    fastify.post(`/create`, async (request, reply) => {
      responseHandler(async () => {
        const req: createDTO = request.body as createDTO   
        let { email, ...shipper_account } = req 
        const data = await ShipperUsecase.createShipperAccount(shipper_account)
        return data

      }, reply)
      await reply
    })
    
    fastify.put(`/confirmed_email`, async (request, reply) => {
      responseHandler(async () => {
        const req: confirmedEmailDTO = request.body as confirmedEmailDTO
        
        let { email, ...identifierRequest } = req 
        
        if(!email)
          throw new Error(`400 : Invalid input, Please input field email`)  

        if('username' in identifierRequest || 'shipper_id' in identifierRequest){
          const data = await ShipperUsecase.confirmedWithEmail(req)
          return data  
        } else {
          throw new Error(`400 : Invalid input, Please input field username or account id`)  
        }
        
      }, reply)
      await reply
    })

    fastify.delete(`/force_delete`, async (request, reply) => {
      responseHandler(async () => {
        const req: deleteDTO = request.body as deleteDTO
        let data
        if(req.identifier?.username || req.identifier?.shipper_id)
          data = await ShipperUsecase.deleteShipperAccount(req)
        else 
          throw new Error(`400 : Invalid input, Input not exist account id or password field`)  
        return data
      }, reply)
    })

    fastify.put(`/delete`, async (request, reply) => {
      responseHandler(async () => {
        const req: deleteDTO = request.body as deleteDTO
        let data
        if(req.identifier?.username || req.identifier?.shipper_id)
          data = await ShipperUsecase.deActivateShipperAccount(req)
        else 
        throw new Error(`400 : Invalid input, Input not exist account id or password field`)  
        return data
      }, reply)
    })

    // fastify.put(`/update`,async (request, reply) => {
    //   responseHandler(async () => {
    //     const reqUpdate: updateDTO = request.body as updateDTO
    //     const { _id, ...rawUpdate } = reqUpdate

    //     if (!Validator.validCheckID(_id)) {
    //       throw new Error(`400 : Invalid input, Please input field id`)
    //     }

    //     const errorFieldsUpdate = Validator.validUpdatedFields(rawUpdate)
    //     if (errorFieldsUpdate.length > 0) {
    //       throw new Error(`400 : Invalid Fields! ${errorFieldsUpdate.join(', ')}`)
    //     }

    //     const data = await TodoUsecase.updateTodo(reqUpdate)
    //     return data
    //   }, reply)
    // })

    // fastify.delete(`/delete`, async (request, reply) => {
    //   responseHandler(async () => {
    //     const data = await TodoUsecase.deleteTodo(request.body as deleteDTO)
    //     return data
    //   }, reply)
    // })

  }

}

export default TodoRoutes
