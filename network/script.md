### 单节点网络

```shell
export COMPOSE_PROJECT_NAME=network
```


### 生成证书

```shell
cryptogen generate --config=./crypto-config-org1.yaml --output="certs"
cryptogen generate --config=./crypto-config-orderer.yaml --output="certs"
```

### 创世区块

```shell
configtxgen -profile OrdererGenesis -channelID system-channel -outputBlock ./genesis.block
```

### 起网络

```shell
docker-compose -f docker-compose-org1-peer0.yaml -f docker-compose-couchdb-org1-peer0.yaml up -d
```

### 拉取core.yaml
```shell
docker cp peer0.org1.example.com:/etc/hyperledger/fabric/core.yaml ./core.yaml
```


### 创建及加入频道

```shell
configtxgen -profile Channel -outputCreateChannelTx ./channel1.tx -channelID channel1

peer channel create --orderer localhost:7050 -c channel1 --ordererTLSHostnameOverride orderer.example.com -f ./channel1.tx --outputBlock ./channel1.block --tls --cafile  ./certs/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem

peer channel join -b channel1.block
```

### cc
```shell
peer lifecycle chaincode package test.tar.gz --path ./contract --lang node --label test_1

peer lifecycle chaincode install test.tar.gz

peer lifecycle chaincode approveformyorg -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com --tls --cafile ./certs/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem --channelID channel1 --name test --version 1 --package-id test_1:ffa5fe481a37d87eb762ea205f84a078245c743d56f646aa67b1bcf6b1c92127 --sequence 1 

peer lifecycle chaincode commit -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com --tls --cafile ./certs/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem --channelID channel1 --name test --version 1 --sequence 1
```

### env
```shell
export CORE_PEER_TLS_ROOTCERT_FILE=/data/caliper1/network/certs/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt
export CORE_PEER_LOCALMSPID=Org1MSP
export CORE_PEER_TLS_ENABLED=true
export CORE_PEER_MSPCONFIGPATH=/data/caliper1/network/certs/peerOrganizations/org1.example.com/users/Admin@org1.example.com/msp
export CORE_PEER_ADDRESS=localhost:7051
export FABRIC_CFG_PATH=/data/caliper1/network
```
