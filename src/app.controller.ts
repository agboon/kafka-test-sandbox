import { Controller, Get, Inject, OnModuleInit } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { IHeaders, KafkaService, SubscribeTo } from '@rob3000/nestjs-kafka';

@Controller()
export class AppController implements OnModuleInit {
    constructor(
        @Inject('TEST_KAFKA_SERVICE') private client: KafkaService
    ) {}

    async onModuleInit() {
        await this.client.subscribeToResponseOf('test-topic', this);
    }

    @Get('produce')
    async produce() {
        const messages = [];
        for (let i = 1; i <= 5; i++) {
            messages.push({
                name: `Test${i}`,
                count: i,
                price: i * 10,
            });
        }
        try {
            const result = await this.client.send({
                topic: 'test-topic',
                messages,
            });
            console.log(result);
        } catch (err) {
            console.log(err);
        }
    }

    @SubscribeTo('test-topic')
    async readMessage(data: any, key: any, offset: number, timestamp: number, partition: number, headers: IHeaders) {
        console.log(data);

        // await this.client.commitOffsets([{
        //     topic: 'test-topic',
        //     partition,
        //     offset: offset.toString(),
        // }]);
    }
}
