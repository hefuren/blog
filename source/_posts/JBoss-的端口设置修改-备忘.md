---
title: JBoss 的端口设置修改(备忘)
tags: Jboss
categories: 程序随记
comments: true
abbrlink: 3f166a67
date: 2017-10-07 22:31:10
copyright: true
---
###### JBOSS默认的各种设置文件中通常定义了以下几个端口:

**1: The ports found in the default configuration Port Type Service**
``` 
。1099 TCP org.jboss.naming.NamingService
。1098 TCP org.jboss.naming.NamingService
。1162 UDP org.jboss.jmx.adaptor.snmp.trapd.TrapdService
。4444 TCP org.jboss.invocation.jrmp.server.JRMPInvoker
。4445 TCP org.jboss.invocation.pooled.server.PooledInvoker
。8009 TCP org.jboss.web.tomcat.tc4.EmbeddedTomcatService
。8009 TCP org.jboss.web.tomcat.tc4.EmbeddedTomcatService
。8083 TCP org.jboss.web.WebService
。8090 TCP org.jboss.web.OILServerILService
。8092 TCP org.jboss.mq.il.oil2.OIL2ServerILService
。8093 TCP org.jboss.mq.il.uil2.UILServerILService
。0a TCP org.jboss.mq.il.rmi.RMIServerILService
。0b UDP org.jboss.jmx.adaptor.snmp.agent.SnmpAgentService
a, This service binds to an anonymous TCP port and does not support configuration of the port or bind interface currently(3.2.2).
b, This service binds to an anonymous UDP port and does not support configuration of the port or bind interface.(3.2.2).
 ```
 
**2: Additional ports found in the all configuration Port Type Service**
``` 
。1100 TCP org.jboss.ha.jndi.HANamingService
。0a TCP org.jboss.ha.jndi.HANamingService
。1102 UDP org.jboss.ha.jndi.HANamingService
。3528 TCP org.jboss.invocation.iiop.IIOPInvoker
。45566b TCP org.jboss.ha.framework.server.ClusterPartition
a, Currently anonymous but can be set via the RmiPort attribute
b, Plus two additional anonymous UDP ports, one can be set using the rcv_port, 
 and the other cannot be seen。
```
