# EC2 Resource Mapping

## Overview

**EC2** and **vCloud Director** have similar resources in their api.  For the sake of this discussion, we are talking about pre IAM EC2 identifiers and resources.

## Resource Mapping

EC2 Resource | vCloud Resource | Rationale
------------ | --------------- | ---------
Account | User |
Region | VDC | While geographic distribution in VCD most likely means another VCD cloud, VDC is a critical scope for operations
Zone | VDC | effectively no zones; vApps could be used, but serialized changes to vApps makes this impractical
Instance | VM | vApps may have multiple VMs
AMI | VM refs in VAppTemplates | VAppTemplates may have multiple VMs
Security Groups | Edge Gateway | provides a routed organization vDC network with connectivity to external networks and can provide FW.
EBS Volume | TODO |
EBS Snapshot | TODO |
SSH Key Pairs | metadata in Org | cinderella:keypair:name key.  Avoids an extra dep.

## Name Mapping

Regions, Availability Zones, Key Pairs, and Security Groups are all accessed by Name instead of by ID.

### Region

The region name will be the same as the VDC name

### Availability Zone

Availability Zone does not exist in a straightforward to map way.  Actions that rely on Availability zone should generate a dummy name, which is the same as the Region with an 'a' suffix.

### Key Pair

The keypair name will be the same as the blob name, after any prefix are stripped.

ex. If keypairs were in a container under prefix keypairs

Remove prefix from keypair

    keypairs/My Keypair
    My Keypair

## ID Mapping

As of version 1.5, vCloud resources are accessed via ID in urn syntax, colon-delimited, including the resource type, with the last field being a UUID in hex-hyphen delmited:

`urn:vcloud:vm:AAAAAAAA-BBBB-CCCC-DDDD-EEEEEEEEEEEE`

The following approach is attempt to use known codecs for converting vCloud urns to/from EC2 identifiers without losing data.

### Account ID

The AWS Account id has the form `1111-2222-3333`.  However, in most contexts, the hypens are removed, resulting in a number.  Many tools do not attempt to parse this into a number.  vCloud UUIDs are 128bit, and will overflow most programming language's numerical types.  It is best to not convert UUIDs into a number unless we find too many tools break.  Here's how to convert the user urn into an account ID likely to work in most tools:

Remove hypens from the UUID

    urn:vcloud:user:AAAAAAAA-BBBB-CCCC-DDDD-EEEEEEEEEEEE
    urn:vcloud:user:AAAAAAAABBBBCCCCDDDDEEEEEEEEEEEE
    
Strip the namespace

    urn:vcloud:user:AAAAAAAABBBBCCCCDDDDEEEEEEEEEEEE
    AAAAAAAABBBBCCCCDDDDEEEEEEEEEEEE


### Namespaced IDs

Most EC2 ids are prefixed with a namespace, delimeted by a hyphen, followed by a string of heFadecimal characters.  ex. `ami-be3adfd7`

Using a consistent codec, we should be able to create EC2-like identifiers, without losing data, and without breaking the character ranges in EC2.

Remove hypens from the UUID

    urn:vcloud:vm:AAAAAAAA-BBBB-CCCC-DDDD-EEEEEEEEEEEE
    urn:vcloud:vm:AAAAAAAABBBBCCCCDDDDEEEEEEEEEEEE
    
Replace namespace with corresponding EC2 value

    urn:vcloud:vm:AAAAAAAABBBBCCCCDDDDEEEEEEEEEEEE
    ami-AAAAAAAABBBBCCCCDDDDEEEEEEEEEEEE

While this is a longer value than typical EC2 references, it is less likely to break code than using a completely different syntax

#### namespace mappings

EC2 namespace | vCloud namespace | Rational
------------ | --------------- | ---------
i- |  urn:vcloud:vm: |
ami- |  urn:vcloud:vm: |
vol- | TODO |
snap- | TODO |
