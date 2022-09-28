'use strict';

const {WorkloadModuleBase} = require('@hyperledger/caliper-core');

class MyWorkload extends WorkloadModuleBase {
    constructor() {
        super();
    }

    async initializeWorkloadModule(workerIndex, totalWorkers, roundIndex, roundArguments, sutAdapter, sutContext) {
        await super.initializeWorkloadModule(workerIndex, totalWorkers, roundIndex, roundArguments, sutAdapter, sutContext);

        /*for (let i=0; i<this.roundArguments.assets; i++) {
            const assetID = `${this.workerIndex}_${i}`;
            console.log(`Worker ${this.workerIndex}: Creating asset ${assetID}`);
            const request = {
                contractId: this.roundArguments.contractId,
                contractFunction: 'createCar',
                invokerIdentity: 'Admin@org1.example.com',
                contractArguments: ['car'+assetID,'toyota','fit','red','Tom'],
                readOnly: false
            };

            await this.sutAdapter.sendRequests(request);
        }*/
    }

    async submitTransaction() {
        const randomId = Math.ceil(Math.random() * 100 * 10000) + this.roundArguments.assets * 100;
        const myArgs = {
            contractId: this.roundArguments.contractId,
            contractFunction: 'queryCar',
            invokerIdentity: 'Admin@org1.example.com',
            contractArguments: ['carD103515'],
            readOnly: true
        };
        await this.sutAdapter.sendRequests(myArgs);
    }

}

function createWorkloadModule() {
    return new MyWorkload();
}

module.exports.createWorkloadModule = createWorkloadModule;
