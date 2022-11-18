const buildVerifyResponse = producerLog => {
  return {
    id: producerLog.id,
    event: producerLog.event,
    createdAt: producerLog.created_at,
    producer: {
      id: producerLog.producer.id,
      name: producerLog.producer.name,
      isVerified: producerLog.producer.is_verified
    },
    creator: {
      id: producerLog.creator.id,
      firstName: producerLog.creator.first_name,
      lastName: producerLog.creator.last_name
    }
  };
};

export default buildVerifyResponse;
