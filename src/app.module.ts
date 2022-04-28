import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KafkaModule } from '@rob3000/nestjs-kafka';

@Module({
    controllers: [AppController],
    providers: [AppService],
    imports: [
        KafkaModule.register([
            {
                name: 'TEST_KAFKA_SERVICE',
                options: {
                    client: {
                        clientId: 'test-kafka',
                        brokers: ['localhost:9092'],
                    },
                    consumer: {
                        groupId: 'test-app',
                    },
                    consumerRunConfig: {
                        autoCommit: false,
                    },
                    consumeFromBeginning: true,
                },
            },
        ]),
    ],
})
export class AppModule {
}
