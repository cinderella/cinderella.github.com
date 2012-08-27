---
layout: cinderella-default
title: AMIs
---

## Overview

AMI is the name of a machine image in EC2.  It most closely maps to a subset of information in the VM of a vAppTemplate.  The below maps the fields and operations as close as possible.

## Fields

EC2 Field | vCloud Field | Rationale
------------ | --------------- | ---------
imageId | id ~ s/urn:vcloud:vm:/ami-/ | use amazon-like syntax
imageLocation | TODO | location relates to S3. possibly the download link of its corresponding ovf?
imageState | map .up(vAppTemplate).state | see below
imageOwnerId | user.id ~ s/urn:vcloud:user:// | ? how to determine owner of vAppTemplate?
isPublic | is vAppTemplate in published catalog | 
productCodes | empty | devpay has no corresponding feature
architecture | map virtualHardwareSection.VirtualSystemType to i386 or x86_64 | not sure of any other way to say 64bit capable.  if all are, then statically map to x86_64
imageType | machine | there's no ramdisk or kernel image
kernelId | empty | there's no ramdisk or kernel image
ramdiskId | empty | there's no ramdisk or kernel image
platform | map OperatingSystemSection.id to windows or unix | CIM OVF [types](http://dmtf.org/sites/default/files/cim/cim_schema_v2280/cim_schema_2.28.0Final-Doc.zip) or `OSType` in jclouds
stateReason | empty | don't know why we need to report state reason on image :)
imageOwnerAlias | "self" if owner is current user, "vcloud", if published | just to maintain semantic compatibility
name | name |
description | description |
rootDeviceType | instance-store | unless you can boot a VM from an independent disk, and store that in the vAppTemplate desc
blockDeviceMapping.item.* | foreach VirtualHardwareSection.Item[resourceType=17, AddressOnParent >0 ] | TODO: need example for ephemeral mappings set on image

## State Mapping
vAppTemplate State | EC2 State | Rationale
------------ | --------------- | ---------
1,8 | available | resolved or off are actionable states
-1 | FILTER OUT | do not show templates that failed creation
* | deregistered

## Operations


### [CreateImage](http://docs.amazonwebservices.com/AWSEC2/2009-10-31/APIReference/ApiReference-query-CreateImage.html)

#### Request Parameters


EC2 Parameter | Required | vCloud input | Rationale
------------ | --------------- | --------------- | ---------
InstanceId | Yes | toCapture = s/i-/urn:vcloud:vm:/.get.parent | from amazon-like syntax to vApp
Name | name | | 
Description | description | | 
NoReboot | noreboot | |

#### Implementation
check undeploy, vdc.captureVApp.blockOnComplete.links[rel=enableDownload].post.blockOnComplete,deploy,!noreboot&&start

#### Response Elements

EC2 Field | vCloud Field | Rationale
------------ | --------------- | ---------
imageId | id ~ s/urn:vcloud:vm:/ami-/ | use amazon-like syntax


### [DeregisterImage](http://docs.amazonwebservices.com/AWSEC2/2009-10-31/APIReference/ApiReference-query-DeregisterImage.html)

#### Request Parameters

EC2 Parameter | Required | vCloud input | Rationale
------------ | --------------- | --------------- | ---------
ImageId | Yes | toCapture = s/i-/urn:vcloud:vm:/.get.parent | from amazon-like syntax to vAppTemplate

#### Implementation
check only 1 child : vm.children; remove

#### Response Elements

EC2 Field | vCloud Field | Rationale
------------ | --------------- | ---------
return | true or false | were we able to remove the VM from the vAppTemplate?

### [DescribeImageAttribute](http://docs.amazonwebservices.com/AWSEC2/2009-10-31/APIReference/ApiReference-query-DescribeImageAttribute.html)

#### Request Parameters

EC2 Parameter | Required | vCloud input | Rationale
------------ | --------------- | --------------- | ---------
ImageId | Yes | id ~ s/ami-/urn:vcloud:vm:/ | from amazon-like syntax
Attribute | Yes | see chart |

#### Attribute Mapping
Attribute | Data 
------------ | ---------------
launchPermission | group=all,userId=imageOwnerId
productCodes | empty
kernel | empty
ramdisk | empty
blockDeviceMapping.item.* | foreach VirtualHardwareSection.Item[resourceType=17, AddressOnParent >0

#### Response Elements
see Attribute Mapping

### [DescribeImages](http://docs.amazonwebservices.com/AWSEC2/2009-10-31/APIReference/ApiReference-query-DescribeImages.html)

#### Request Parameters

EC2 Parameter | Required | vCloud input | Rationale
------------ | --------------- | --------------- | ---------
ImageId.N | No | vmId ~ s/ami-/urn:vcloud:vm:/ | from amazon-like syntax
ExecutableBy | No | executableId ~ urn:vcloud:user:+ExecutableBy | from amazon-like syntax
Owner | No | ownerId ~ urn:vcloud:user:+ExecutableBy | from amazon-like syntax

#### Implementation
vdc.resourceEntities[type=vapptemplate].get.children[]

filters should be applied, and in fact ImageId.N should be more efficient.

Executable by is trickier as that implies access to read things that you cannot launch.  This might not be possible in vCloud.

#### Response Elements

see Fields

### [ModifyImageAttribute](http://docs.amazonwebservices.com/AWSEC2/2009-10-31/APIReference/ApiReference-query-ModifyImageAttribute.html)

#### Request Parameters

EC2 Parameter | Required | vCloud input | Rationale
------------ | --------------- | --------------- | ---------
ImageId | Yes | templateId ~ s/ami-/urn:vcloud:vm:/.get.up | from amazon-like syntax

##### When Attribute == productCodes
unsupported

##### When Attribute == launchPermission

EC2 Parameter | Required | vCloud input | Rationale
------------ | --------------- | --------------- | ---------
UserGroup | Yes | all | only valid value, designating full access
OperationType | Yes | add or remove | action to take
UserId.N | user =~ urn:vcloud:user:+ExecutableBy | from amazon-like syntax

#### Implementation
TODO: access control add ability for user to modify vAppTempalte

#### Response Elements


EC2 Field | vCloud Field | Rationale
------------ | --------------- | ---------
return | true or false | were we able to change access?
