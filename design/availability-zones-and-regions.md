---
layout: cinderella-default
title: Availability Zones and Regions
---

## Overview

Availability Zones and Regions control the scope of and placement of resources in EC2.   Apart from the DescribeRegions action, all other calls in the EC2 api presume that the Region is implicit, based on the host of the API server.

## Operations


### [DescribeRegions](http://docs.amazonwebservices.com/AWSEC2/2009-10-31/APIReference/ApiReference-query-DescribeRegions.html)

So, there's an issue relating to regions we need to address.  In vCloud, many operations need VDC context, like instantiating & listing VApps, determining which networks, templates, disks are available. The idea is that we need to propagate the VDC context to the EC2 api.
Mapping VDC to Region allows us to do this.

#### Request Parameters


EC2 Parameter | Required | vCloud input | Rationale
------------ | --------------- | --------------- | ---------
RegionName.N | No | filter = vdc.name | 

#### Implementation
orgList.org[].links[type=vdc].name

endpoint is hostname + port

using ports allows us to avoid dns requirements.  jetty can listen on multiple ports.  When a request comes in, it can get its implicit region via `regionToPort.reverse.get(ServletRequest.getServerPort())`

#### Response Elements

EC2 Field | vCloud Field | Rationale
------------ | --------------- | ---------
regionName | vdc.name | 
regionEndpoint | hostname:+regionToPort.get(vdc.name) | see below



### [DescribeAvailabilityZones](http://docs.amazonwebservices.com/AWSEC2/2009-10-31/APIReference/ApiReference-query-DescribeAvailabilityZones.html)

#### Request Parameters

EC2 Parameter | Required | vCloud input | Rationale
------------ | --------------- | --------------- | ---------
ZoneName.N | No | filter = zone.name | 

#### Implementation
implicit vdc.name + 'a'

#### Response Elements

EC2 Field | vCloud Field | Rationale
------------ | --------------- | ---------
zoneName | vdc.name + 'a'| just return implicit vdc name with 'a' appended to it, until we choose to support vApps to emulate zones.
zoneState | vdc.status = READY(1) | 
