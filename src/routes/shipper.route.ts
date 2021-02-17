import { FastifyInstance, FastifyPluginOptions } from 'fastify'
import ShipperUsecase from '../usecase/shipper.usecase'
import responseHandler from '../helper/response.handler'
import { Payload } from '../entities/dtos/token.dto'
import {
    createDTO,
    confirmedEmailDTO,
    deleteDTO,
    identifierDTO,
    whitelistUpdateProfileForShipperDTO,
    whitelistUpdateProfileForSrvDTO,
    updateProfileDTO,
} from '../entities/dtos/shipper.dto'
import * as Validator from '../helper/validate.helper'

class ShipperRoute {
    public prefix_route = '/shipper'

    async routes(fastify: FastifyInstance, opts: FastifyPluginOptions, done: any) {
        fastify.get(`/healthcheck`, async (request, reply) => {
            responseHandler(async () => {
                return { healthcheck: 'server is alive' }
            }, reply)
            await reply
        })

        fastify.get(`/srv/profile`, { preValidation: [(fastify as any).verifyAuth] }, async (request, reply) => {
            responseHandler(async () => {
                const { role } = request.user as Payload
                if (role === 'srv') {
                    const identifier: identifierDTO = request.query as identifierDTO
                    const data = await ShipperUsecase.srvFindShipperByIdentifier(identifier)
                    return data
                }
                throw new Error(`403 : You havn't permission in this endpoint, pls contract admin.`)
            }, reply)
            await reply
        })

        fastify.put(`/srv/profile/update`, { preValidation: [(fastify as any).verifyAuth] }, async (request, reply) => {
            responseHandler(async () => {
                const { role } = request.user as Payload
                if (role === 'srv') {
                    const account: updateProfileDTO = request.body as updateProfileDTO
                    const { identifier, profile } = account
                    if (identifier.username || identifier.shipper_id) {
                        const errorFieldsUpdate = Validator.validUpdatedFields(
                            profile as whitelistUpdateProfileForSrvDTO,
                            'shipper_srv',
                        )
                        if (errorFieldsUpdate.length > 0)
                            throw new Error(`400 : Invalid Fields! ${errorFieldsUpdate.join(', ')}`)
                    } else {
                        throw new Error(`400 : Invalid input, Input not exist account id or password field`)
                    }

                    const data = await ShipperUsecase.updateProfileShipperAccount(account)
                    return data
                }
                throw new Error(`403 : You havn't permission in this endpoint, pls contract admin.`)
            }, reply)
            await reply
        })

        fastify.post(`/srv/create`, async (request, reply) => {
            responseHandler(async () => {
                const shipper_account: createDTO = request.body as createDTO
                const data = await ShipperUsecase.createShipperAccount(shipper_account)
                return data
            }, reply)
            await reply
        })

        // This route have vulnerability at client, we should use this route service to service for policy.
        fastify.put(
            `/srv/confirmed/email`,
            { preValidation: [(fastify as any).verifyAuth] },
            async (request, reply) => {
                responseHandler(async () => {
                    const req: confirmedEmailDTO = request.body as confirmedEmailDTO
                    const { identifier } = req
                    if ('username' in identifier || 'shipper_id' in identifier) {
                        const data = await ShipperUsecase.confirmedWithEmail(req)
                        return data
                    } else {
                        throw new Error(`400 : Invalid input, Please input field username or account id`)
                    }
                }, reply)
                await reply
            },
        )

        fastify.get(`/profile/:username`, async (request, reply) => {
            responseHandler(async () => {
                const param: identifierDTO = request.params as identifierDTO
                const data = await ShipperUsecase.findProfileShipperAccountByUsername(param)
                return data
            }, reply)
            await reply
        })

        fastify.delete(`/force/delete`, { preValidation: [(fastify as any).verifyAuth] }, async (request, reply) => {
            responseHandler(async () => {
                const req: deleteDTO = request.body as deleteDTO
                const { username } = request.user as Payload
                const identifier: identifierDTO = { username }
                let data

                if (identifier.username || identifier.shipper_id)
                    data = await ShipperUsecase.deleteShipperAccount({ ...req, identifier })
                else throw new Error(`400 : Invalid input, Input not exist account id or password field`)
                return data
            }, reply)
            await reply
        })

        fastify.put(`/delete`, { preValidation: [(fastify as any).verifyAuth] }, async (request, reply) => {
            responseHandler(async () => {
                const req: deleteDTO = request.body as deleteDTO
                const { username } = request.user as Payload
                const identifier: identifierDTO = { username }
                let data

                if (identifier.username || identifier.shipper_id)
                    data = await ShipperUsecase.deActivateShipperAccount({ ...req, identifier })
                else throw new Error(`400 : Invalid input, Input not exist account id or password field`)
                return data
            }, reply)
            await reply
        })

        fastify.put(`/profile/update`, { preValidation: [(fastify as any).verifyAuth] }, async (request, reply) => {
            responseHandler(async () => {
                const { username } = request.user as Payload
                const identifier: identifierDTO = { username }
                const profile: whitelistUpdateProfileForShipperDTO = request.body as whitelistUpdateProfileForShipperDTO

                if (identifier.username || identifier.shipper_id) {
                    const errorFieldsUpdate = Validator.validUpdatedFields(profile, 'shipper')
                    if (errorFieldsUpdate.length > 0)
                        throw new Error(`400 : Invalid Fields! ${errorFieldsUpdate.join(', ')}`)
                } else {
                    throw new Error(`400 : Invalid input, Input not exist account id or password field`)
                }

                const data = await ShipperUsecase.updateProfileShipperAccount({ identifier, profile })
                return data
            }, reply)
            await reply
        })

        done()
    }
}

export default ShipperRoute
