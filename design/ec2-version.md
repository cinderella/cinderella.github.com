---
layout: cinderella-default
title: EC2 Version
---

## Overview

**EC2** has a version, which decides the breadth and form of operations and entities you can control.  It is important to choose a version corresponding to the highest percentage of features a product can support, as this relates directly to perception of compatibility.  For reasons outline below, the version of Cinderella is set to `2009-10-31`

### Rationale

Cinderella initially aims to support critical EC2 functionality such as EBS Volumes.  While other functions such as VPC will be added later, fixing a version that can show progress is a primary goal.  

At the time of the writing, CloudStack's Cloud Bridge was targeted to `2010-11-15`.  This release requires support for filters on many of the describe actions.  While filters can be implemented in the future with the vCloud Query API, it isn't an immediate goal.  We selected a more basic version of `2009-10-31` to be able to deliver functionality quickly.

### Feature Mapping

The following was parsed from the [2009-10-31 documentation](http://docs.amazonwebservices.com/AWSEC2/2009-10-31/APIReference/index.html?OperationList-query.html).


Function | Operation | Mapping to vCloud
------------ | --------------- | ---------
Amazon DevPay | [ConfirmProductInstance](http://docs.amazonwebservices.com/AWSEC2/2009-10-31/APIReference/ApiReference-query-ConfirmProductInstance.html) | N/A
AMIs | [CreateImage](http://docs.amazonwebservices.com/AWSEC2/2009-10-31/APIReference/ApiReference-query-CreateImage.html) | check undeploy, captureVApp.blockOnComplete.links[rel=enableDownload].post.blockOnComplete
AMIs | [DeregisterImage](http://docs.amazonwebservices.com/AWSEC2/2009-10-31/APIReference/ApiReference-query-DeregisterImage.html) |
AMIs | [DescribeImageAttribute](http://docs.amazonwebservices.com/AWSEC2/2009-10-31/APIReference/ApiReference-query-DescribeImageAttribute.html) |
AMIs | [DescribeImages](http://docs.amazonwebservices.com/AWSEC2/2009-10-31/APIReference/ApiReference-query-DescribeImages.html) | vdc.resourceEntities[type=vapptemplate].get.children[]
AMIs | [ModifyImageAttribute](http://docs.amazonwebservices.com/AWSEC2/2009-10-31/APIReference/ApiReference-query-ModifyImageAttribute.html) |
Availability Zones and Regions | [DescribeAvailabilityZones](http://docs.amazonwebservices.com/AWSEC2/2009-10-31/APIReference/ApiReference-query-DescribeAvailabilityZones.html) | vdc.name + 'a'
Availability Zones and Regions | [DescribeRegions](http://docs.amazonwebservices.com/AWSEC2/2009-10-31/APIReference/ApiReference-query-DescribeRegions.html) | orgList.org[].links[type=vdc].name
Elastic Block Store | [AttachVolume](http://docs.amazonwebservices.com/AWSEC2/2009-10-31/APIReference/ApiReference-query-AttachVolume.html) | vm.links[rel=disk:attach].post[diskHref].blockOnComplete
Elastic Block Store | [CreateSnapshot](http://docs.amazonwebservices.com/AWSEC2/2009-10-31/APIReference/ApiReference-query-CreateSnapshot.html) | snapshot only scoped to vApp, not independent disks
Elastic Block Store | [CreateVolume](http://docs.amazonwebservices.com/AWSEC2/2009-10-31/APIReference/ApiReference-query-CreateVolume.html) | vdc.links[rel=disk].post[name,size,desc].blockOnComplete
Elastic Block Store | [DeleteSnapshot](http://docs.amazonwebservices.com/AWSEC2/2009-10-31/APIReference/ApiReference-query-DeleteSnapshot.html) | snapshot only scoped to vApp, not independent disks
Elastic Block Store | [DeleteVolume](http://docs.amazonwebservices.com/AWSEC2/2009-10-31/APIReference/ApiReference-query-DeleteVolume.html) | disk.links[rel=remove].post[diskHref].blockOnComplete
Elastic Block Store | [DescribeSnapshotAttribute](http://docs.amazonwebservices.com/AWSEC2/2009-10-31/APIReference/ApiReference-query-DescribeSnapshotAttribute.html) | snapshot only scoped to vApp, not independent disks
Elastic Block Store | [DescribeSnapshots](http://docs.amazonwebservices.com/AWSEC2/2009-10-31/APIReference/ApiReference-query-DescribeSnapshots.html) | snapshot only scoped to vApp, not independent disks
Elastic Block Store | [DescribeVolumes](http://docs.amazonwebservices.com/AWSEC2/2009-10-31/APIReference/ApiReference-query-DescribeVolumes.html) | vdc.disks[].get
Elastic Block Store | [DetachVolume](http://docs.amazonwebservices.com/AWSEC2/2009-10-31/APIReference/ApiReference-query-DetachVolume.html) | vm.links[rel=disk:dettach].post[diskHref].blockOnComplete
Elastic Block Store | [ModifySnapshotAttribute](http://docs.amazonwebservices.com/AWSEC2/2009-10-31/APIReference/ApiReference-query-ModifySnapshotAttribute.html) | snapshot only scoped to vApp, not independent disks
Elastic Block Store | [ResetSnapshotAttribute](http://docs.amazonwebservices.com/AWSEC2/2009-10-31/APIReference/ApiReference-query-ResetSnapshotAttribute.html) | snapshot only scoped to vApp, not independent disks
Elastic IP Addresses | [AllocateAddress](http://docs.amazonwebservices.com/AWSEC2/2009-10-31/APIReference/ApiReference-query-AllocateAddress.html) |
Elastic IP Addresses | [AssociateAddress](http://docs.amazonwebservices.com/AWSEC2/2009-10-31/APIReference/ApiReference-query-AssociateAddress.html) | vApp.links[type=networkConfigSection].put[OneToOneVmRule.ExternalIpAddress=1.1.1.1,VAppScopedVmId=X]
Elastic IP Addresses | [DescribeAddresses](http://docs.amazonwebservices.com/AWSEC2/2009-10-31/APIReference/ApiReference-query-DescribeAddresses.html) |
Elastic IP Addresses | [DisassociateAddress](http://docs.amazonwebservices.com/AWSEC2/2009-10-31/APIReference/ApiReference-query-DisassociateAddress.html) |
Elastic IP Addresses | [ReleaseAddress](http://docs.amazonwebservices.com/AWSEC2/2009-10-31/APIReference/ApiReference-query-ReleaseAddress.html) |
General | [GetConsoleOutput](http://docs.amazonwebservices.com/AWSEC2/2009-10-31/APIReference/ApiReference-query-GetConsoleOutput.html) |
Images | [RegisterImage](http://docs.amazonwebservices.com/AWSEC2/2009-10-31/APIReference/ApiReference-query-RegisterImage.html) |
Images | [ResetImageAttribute](http://docs.amazonwebservices.com/AWSEC2/2009-10-31/APIReference/ApiReference-query-ResetImageAttribute.html) |
Instances | [DescribeInstanceAttribute](http://docs.amazonwebservices.com/AWSEC2/2009-10-31/APIReference/ApiReference-query-DescribeInstanceAttribute.html) |
Instances | [DescribeInstances](http://docs.amazonwebservices.com/AWSEC2/2009-10-31/APIReference/ApiReference-query-DescribeInstances.html) |
Instances | [ModifyInstanceAttribute](http://docs.amazonwebservices.com/AWSEC2/2009-10-31/APIReference/ApiReference-query-ModifyInstanceAttribute.html) |
Instances | [RebootInstances](http://docs.amazonwebservices.com/AWSEC2/2009-10-31/APIReference/ApiReference-query-RebootInstances.html) |
Instances | [ResetInstanceAttribute](http://docs.amazonwebservices.com/AWSEC2/2009-10-31/APIReference/ApiReference-query-ResetInstanceAttribute.html) |
Instances | [RunInstances](http://docs.amazonwebservices.com/AWSEC2/2009-10-31/APIReference/ApiReference-query-RunInstances.html) |
Instances | [StartInstances](http://docs.amazonwebservices.com/AWSEC2/2009-10-31/APIReference/ApiReference-query-StartInstances.html) |
Instances | [StopInstances](http://docs.amazonwebservices.com/AWSEC2/2009-10-31/APIReference/ApiReference-query-StopInstances.html) |
Instances | [TerminateInstances](http://docs.amazonwebservices.com/AWSEC2/2009-10-31/APIReference/ApiReference-query-TerminateInstances.html) |
Key Pairs | [CreateKeyPair](http://docs.amazonwebservices.com/AWSEC2/2009-10-31/APIReference/ApiReference-query-CreateKeyPair.html) | generateKeypair -> vdc.media[name="keypairs"].metadata.put["keyPairName"]
Key Pairs | [DeleteKeyPair](http://docs.amazonwebservices.com/AWSEC2/2009-10-31/APIReference/ApiReference-query-DeleteKeyPair.html) | vdc.media[name="keypairs"].metadata.remove["keyPairName"]
Key Pairs | [DescribeKeyPairs](http://docs.amazonwebservices.com/AWSEC2/2009-10-31/APIReference/ApiReference-query-DescribeKeyPairs.html) | vdc.media[name="keypairs"].metadata.get
Monitoring | [MonitorInstances](http://docs.amazonwebservices.com/AWSEC2/2009-10-31/APIReference/ApiReference-query-MonitorInstances.html) | N/A
Monitoring | [UnmonitorInstances](http://docs.amazonwebservices.com/AWSEC2/2009-10-31/APIReference/ApiReference-query-UnmonitorInstances.html) | N/A
Reserved Instances | [DescribeReservedInstances](http://docs.amazonwebservices.com/AWSEC2/2009-10-31/APIReference/ApiReference-query-DescribeReservedInstances.html) |
Reserved Instances | [DescribeReservedInstancesOfferings](http://docs.amazonwebservices.com/AWSEC2/2009-10-31/APIReference/ApiReference-query-DescribeReservedInstancesOfferings.html) |
Reserved Instances | [PurchaseReservedInstancesOffering](http://docs.amazonwebservices.com/AWSEC2/2009-10-31/APIReference/ApiReference-query-PurchaseReservedInstancesOffering.html) |
Security Groups | [AuthorizeSecurityGroupIngress](http://docs.amazonwebservices.com/AWSEC2/2009-10-31/APIReference/ApiReference-query-AuthorizeSecurityGroupIngress.html) |
Security Groups | [CreateSecurityGroup](http://docs.amazonwebservices.com/AWSEC2/2009-10-31/APIReference/ApiReference-query-CreateSecurityGroup.html) |
Security Groups | [DeleteSecurityGroup](http://docs.amazonwebservices.com/AWSEC2/2009-10-31/APIReference/ApiReference-query-DeleteSecurityGroup.html) |
Security Groups | [DescribeSecurityGroups](http://docs.amazonwebservices.com/AWSEC2/2009-10-31/APIReference/ApiReference-query-DescribeSecurityGroups.html) |
Security Groups | [RevokeSecurityGroupIngress](http://docs.amazonwebservices.com/AWSEC2/2009-10-31/APIReference/ApiReference-query-RevokeSecurityGroupIngress.html) |
Windows | [BundleInstance](http://docs.amazonwebservices.com/AWSEC2/2009-10-31/APIReference/ApiReference-query-BundleInstance.html) | check undeploy, captureVApp.blockOnComplete.links[rel=enableDownload].post.blockOnComplete
Windows | [CancelBundleTask](http://docs.amazonwebservices.com/AWSEC2/2009-10-31/APIReference/ApiReference-query-CancelBundleTask.html) |
Windows | [DescribeBundleTasks](http://docs.amazonwebservices.com/AWSEC2/2009-10-31/APIReference/ApiReference-query-DescribeBundleTasks.html) |
Windows | [GetPasswordData](http://docs.amazonwebservices.com/AWSEC2/2009-10-31/APIReference/ApiReference-query-GetPasswordData.html) |
