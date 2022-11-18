import BaseService from "../../services/BaseService.js";
import ProducerLogService from "../../services/producerLog.js";
import UserService from "../../services/user.js";

export default class ContractService extends BaseService{
  static async getProducerContractList(userProducer) {
    const producer = userProducer.producer;
    const verificationAgreementAccepted = 'verification_agreement_accepted';

    if (producer.is_verified) {
      const producerLogVerificationAccepted = await ProducerLogService.get({
        producerId: producer.id,
        event: verificationAgreementAccepted
      })
      const user = await UserService.get(producerLogVerificationAccepted.created_by)

      const response = {
        contractName: 'TOS',
        producerId: producer.id,
        producerName: producer.name,
        acceptedById: user.id,
        acceptedByName: `${user.first_name} ${user.last_name}`,
        acceptedTimestamp: producerLogVerificationAccepted.created_at
      };
      return [response];
    }
  }
}
