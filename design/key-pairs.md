---
layout: cinderella-default
title: Key Pairs
---

## Overview

Key pairs correspond to ssh keys generated on amazon server.  There's no blobstore in vCloud.  However, there is metadata.  To store keypairs, we can create a zero length ISO media resource in each VDC (aka Region) named "keypairs".  This prevents us from having an external storage dependency.

	keyPairUrn = findOrCreateMediaInVDCNamed(currentVDC, "keypairs").getId()
	metadataApi = mediaApi.getMetadataApi(keyPairUrn)

## Fields

EC2 Field | metadata | Notes
------------ | --------------- | ---------------
keyName | keyName |
keyFingerprint | value.sha1OfPrivateKey | jclouds SshKeys.sha1PrivateKey
 | value.publicKey | only used when creating instances


## Operations


### [CreateKeyPair](http://docs.amazonwebservices.com/AWSEC2/2009-10-31/APIReference/ApiReference-query-CreateKeyPair.html)


#### Request Parameters

EC2 Parameter | Required 
------------ | --------------- 
KeyName | Yes

#### Implementation


    keyPair = SshKeys.generate()
	key.put("keyName", keyName);
	key.put("keyFingerprint", SshKeys.sha1PrivateKey(keyPair.get("private")));
	key.put("publicKey", keyPair.get("public")));
	metadataApi.put("keyName", toJson(key))


#### Response Elements

EC2 Field | map
------------ | ---------------
keyName | json.keyName
keyFingerprint | json.keyFingerprint
keyMaterial | keyPair.get("private")


### [DeleteKeyPair](http://docs.amazonwebservices.com/AWSEC2/2009-10-31/APIReference/ApiReference-query-DeleteKeyPair.html)

#### Request Parameters

EC2 Parameter | Required 
------------ | --------------- 
KeyName | Yes

#### Implementation

	metadataApi.remove("keyName").block()


#### Response Elements

EC2 Field | map
------------ | ---------------
return | true if success


### [DescribeKeyPairs](http://docs.amazonwebservices.com/AWSEC2/2009-10-31/APIReference/ApiReference-query-DescribeKeyPairs.html)

#### Request Parameters

EC2 Parameter | Required 
------------ | --------------- 
KeyName.N | No

#### Implementation


	filter = keyNames?in(keyNames):any
	keys = filter(metadataApi.get).values


#### Response Elements

EC2 Field | map
------------ | ---------------
keyName | json.keyName
keyFingerprint | json.keyFingerprint
