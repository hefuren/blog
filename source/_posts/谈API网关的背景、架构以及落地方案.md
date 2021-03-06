---
title: 谈API网关的背景、架构以及落地方案
comments: true
categories: 程序随记
tags: API Gateway
abbrlink: fe1209ee
date: 2017-11-05 11:23:45
updated:
copyright: true
---

转自： [http://www.infoq.com/cn/news/2016/07/API-background-architecture-floo](http://www.infoq.com/cn/news/2016/07/API-background-architecture-floo)

Chris Richardson曾经在[他的博客](http://microservices.io/patterns/apigateway.html)上详细介绍过API网关，包括API网关的背景、解决方案以及案例。对于大多数基于微服务的应用程序而言，API网关都应该是系统的入口，它会负责服务请求路由、组合及协议转换。如Chris所言，在微服务的应用程序中，客户端和微服务之间的交互，有如下几个挑战：

1. 微服务提供的API粒度通常与客户端的需求不同，微服务一般提供细粒度的API，也就是说客户端需要与多个服务进行交互。

2. 不同的客户端需要不同的数据，不同类型客户端的网络性能不同。

3. 服务的划分可能会随时间而变化，因此需要对客户端隐藏细节。

那API网关具体是如何解决这些问题的，在API网关的落地上，需要注意哪些地方，就这些问题，InfoQ编辑采访了普元主任架构师王延炯，与他一起探讨了API网关的来龙去脉。

<br>
**InfoQ：谈谈你所理解的API网关，以及API网关出现的背景？**

> 
**王延炯：**API Gateway（API GW / API 网关），顾名思义，是出现在系统边界上的一个面向API的、串行集中式的强管控服务，这里的边界是企业IT系统的边界。<br>
在微服务概念的流行之前，API GW的实体就已经诞生了，这时的主要应用场景是OpenAPI，也就是开放平台，面向的是企业外部合作伙伴，对于这个应用场景，相信接触的人会比较多。当在微服务概念流行起来之后，API网关似乎成了在上层应用层集成的标配组件。<br>
![](https://res.infoq.com/news/2016/07/API-background-architecture-floo/zh/resources/1.png) <br>
其实，在我所经历过的项目中，API GW的定位主要有五类：
1. **面向Web App**：
这类场景，在物理形态上类似前后端分离，此时的Web App已经不是全功能的Web App，而是根据场景定制、场景化的App。<br>
2. **面向Mobile App**：
这类场景，移动App是后端Service的使用者，此时的API GW还需要承担一部分MDM（此处是指移动设备管理，不是主数据管理）的职能。<br>
3. **面向Partner OpenAPI**
这类场景，主要为了满足业务形态对外开放，与企业外部合作伙伴建立生态圈，此时的API GW需要增加配额、流控、令牌等一系列安全管控功能。<br>
4. **面向Partner ExternalAPI**
这类场景，业界提的比较少，很多时候系统的建设，都是为了满足企业自身业务的需要，实现对企业自有业务的映射。当互联网形态逐渐影响传统企业时，很多系统都会为了导入流量或者内容，依赖外部合作伙伴的能力，一些典型的例子就是使用「合作方账号登录」、「使用第三方支付平台支付」等等，这些对于企业内部来说，都是一些外部能力。此时的API GW就需要在边界上，为企业内部Service 统一调用外部的API做统一的认证、（多租户形式的）授权、以及访问控制。<br>
5. **面向IoT SmartDevice**
这类场景，业界就提的更少了，但在传统企业，尤其是工业企业，传感器、物理设备从工业控制协议向IP转换，导致具备信息处理能力的「智能产品」在被客户激活使用直至报废过程中，信息的传输不能再基于VPN或者企业内部专线，导致物理链路上会存在一部分公网链路。此时的API GW所需要满足的，就是不是前三种单向的由外而内的数据流，也不是第四种由内而外的数据流，「内外兼修」的双向数据流，对于企业的系统来说终端设备很多情况下都不是直连网关，而是进过一个「客户侧」的集中网关在和企业的接入网关进行通信。<br>

<br>
**InfoQ：在一个微服务架构中，API网关会在架构中的那一层？他主要的作用是什么？**

> 
**王延炯：**接续前一个话题，我把API GW分为了五类，对于当前的企业而言被关注的是前三类或者前四类API GW。显然，它们都会出现在企业系统的边界上，也就是和企业外部交互的「独木桥」上。<br>
它们除了保证数据的交换之外，还需要实现对接入客户端的身份认证、防报文重放与防数据篡改、功能调用的业务鉴权、响应数据的脱敏、流量与并发控制，甚至基于API调用的计量或者计费。

**InfoQ：你有研究过Netflix的API网关吗？在实现方式上，你觉得他们的方式有什么巧妙之处吗？**

> 
**王延炯：**Netflix 的API GW，主要是指Zuul, Netflix 将他们用于自己的三大场景： Website Service, API Service, Streaming Service。其中前两个定位与我的前两个分类：Web App, Mobile App比较类似，第三个Streaming Service主要是netflix的核心视频业务所形成的特有形态。<br>
Netflix在Zuul的实现上，主要特色是：Filter的PRE ROUTING POST ERROR（PRPE 模型），以及采用Groovy脚本的Filter实现机制、采用Cassandra作为filter repository的机制。<br>
Filter 以及 Filter的PRPE模型，是典型的「前正后反模型」的实现，为集成的标准化做好了框架层面的铺垫。<br>
Netflix其实并没有对API GW进行深入的功能实现（或者说面相业务友好的相关功能），整体上它只提供了一个技术框架、和一些标准的filter实例实现，相信了解过filter chain原理的分布式中间件工程师也能搭出这样的框架。这么做的原因，我认为很大原因是API GW所扮演的角色是一个业务平台，而非技术平台，将行业特征很强的业务部分开源，对于受众意义也不是特别大。另外，除了Netflix Zuul，在商业产品上还有apigee公司所提供的方案，在轻量级开源实现上还有基于Nginx的kong，kong其实提供了19个插件式的功能实现，涵盖的面主要在于安全、监控等领域，但缺少对报文转换的能力（为什么缺 也很显而易见——避免产生业务场景的耦合，更通用）。<br>
另外，还有基于TCP协议的GW，比如携程无线应用的后端实现有HTTP和TCP两种，有兴趣的读者也可以深入关注。

**InfoQ：在API网关的设计上，需要包含哪些要素？**

> 
**王延炯**：从三个方面说吧，API网关本身以及API网关客户端，还有配套的自助服务平台。具体如下：<br>
**API GW本身**
- NIO接入，异步接出
- 流控与屏蔽
- 秘钥交换
- 客户端认证与报文加解密
- 业务路由框架
- 报文转换
- HTTP DNS/ Direct IP<br>

> 
**API GW 客户端 SDK / Library**
- 基本通信
- 秘钥交换与Cache
- 身份认证与报文加解密

> 
**配套的在线自助服务平台**
- 代码生成
- 文档生成
- 沙盒调测

<br>
**InfoQ：在API网关的落地上，你有可行的方案吗？在API网关的落地上，难点是什么？**

> 
**王延炯：**在我所服务过的阿里系、非电商互联网公司里，内部的分布式服务调用采用的是Dubbo，但移动应用是iOS和Android，基本上没有PC Web端的客户端，在这种条件下，API GW所承担的一个重要角色就是报文转换，并且是跨语言、跨运行平台的报文转换。报文就是数据，在跨平台、跨语言的条件下，对于数据的描述——元数据——也就是类定义，对于API GW的系统性挑战是巨大的：传输时，报文内不能传输类定义，跨语言的类定义转换、生成与加载。

> 
API GW的落地技术基本贯通没有太大的难度，但形成最佳的实践，有一些外围的前置条件，比如：

> 
**后端API粒度**

> 
能和原子业务能力找到映射最好，一定要避免「万能接口」的出现。

> 
**业务路由的实现和含报文转换的API不停机发布**

> 
尽可能的在报文头里面存放业务路由所需要的信息，避免对报文体进行解析。

> 
API GW上线后，面临的很大问题都是后端服务如何自助发布到外部，同时不能重启网关服务，以保障业务的连续。在此过程中，如果涉及到报文格式的转换，那对API网关实现的技术要求比较高。如果让网关完成报文转换，第一种方案，网关需要知道报文的具体格式（也就是报文的元数据，或者是类定义），这部分要支持热更新。第二种方案，需要客户端在报文内另外附加元数据，网关通过运行期加载元数据对报文进行解析在进行报文的转换，这种方案性能不会很好。第三种方案，就是在运行期首次报文转换的时候，根据元数据生成报文转换代码并加载，这种方案对技术实现要求比较高，对网关外围平台支撑力度要求也不低。

> 
**客户端的秘钥管理**

> 
很多人都会把安全问题简单的用加密算法来解决，这是一个严重的误区，很多时候都存在对秘钥进行系统性管理的短板。打个比方，加密算法就好比家里的保险箱，而秘钥是保险箱的钥匙，而缺乏秘钥管理的安全方案，就好比把钥匙放在自家的客厅茶几上。更何况，安全方案里加解密也只是其中的一部分。

<br>

**InfoQ：你认为一个设计良好的API网关应该做到什么？**

> 
**王延炯：**目前业界关注的API GW，主要是在前三类，下文对于API网关的设计上，侧重于「面向接入」的API GW。

> 
在API网关的设计上，仅仅有类似Zuul这样的「面向接入」的运行期框架是远远不够的，因为一个完整的、「面向接入」的API GW需要包含以下功能：

> 
**面向运行期**
- 对客户端实现身份认证
- 通信会话的秘钥协商，报文的加密与解密
- 日常流控与应急屏蔽
- 内部响应报文的场景化裁剪
- 支持「前正后反模型」的集成框架
- 报文格式的转换
- 业务路由的支撑
- 客户端优先的超时机制
- 全局流水号的生成与应用
- 面向客户端支持HTTP DNS / Direct IP

> 
**面向开发期** 
- 自助的沙盒测试环境
- 面向客户端友好的 SDK / Library以及示例
- 能够根据后端代码直接生成客户端业务代码框架
- 完善的报文描述能力（元数据），支撑配置型的报文裁剪

> 
**面向运维与运营**
- 支持面向接入方的独立部署与快速水平扩展
- 面向业务场景或合作伙伴的自助API开通
- 对外接口性能与线上环境故障定位自助平台
 