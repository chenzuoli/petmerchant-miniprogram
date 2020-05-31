//index.js
var zhenzisms = require('../../utils/zhenzisms.js');
var get_code_url = 'https://pipilong.pet:7443/smsCode'
var register_url = 'https://pipilong.pet:7443/register'
var wx_login_url = "https://pipilong.pet:7443/petcage/wx_login"
var get_service_private_content = 'https://pipilong.pet:7443/petcage/get_service_private_content'

//获取应用实例
const app = getApp();
const api = app.globalData.api

Page({
  data: {
    hidden: true,
    btnValue: '',
    btnDisabled: false,
    name: '',
    phone: '',
    code: '',
    second: 60,
    rawData: "",
    userInfo: "",
    service_content: "",
    is_agree: "0",
    showModal: true, // 显示modal弹窗
    single: false, // false 只显示一个按钮，如果想显示两个改为true即可
    title: "服务条例与隐私协议",
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    Custom: app.globalData.Custom
  },
  onLoad: function () {
    // await api.showLoading() // 显示loading
    // 从数据库中获取服务条例与隐私协议内容
    // await this.get_service_private_content()
    // await api.hideLoading()
    // 从前端取
    this.setData({
      service_content: "\n\
          会员服务协议\n\
一、首部及导言\n\
欢迎您使用电巴克宠物临时寄存服务！\n\
为使用电巴克宠物临时寄存服务（简称为：本服务），您应当阅读并遵守《会员服务协议》（简称为：本协议）。请您务必审慎阅读、充分理解各条款内容，特别是免除或限制责任的相应条款，以及开通或使用某项服务的单独协议，并选择接受或不接受。免除或限制责任条款可能以加粗形式提示您注意。\n\
除非您已阅读并接受本协议所有条款，否则您无权使用本服务。您对本服务的任何购买或接受赠与等获取行为及登录、查看等任何使用行为即视为您已阅读并同意本协议的约束。\n\
如果您未满18周岁，请在法定监护人的陪同下阅读本协议，并特别注意未成年人使用条款。\n\
二、协议的范围\n\
1.	【协议适用主体范围】本协议是您与电巴克之间关于您使用本服务所订立的协议。\n\
2.	【本服务内容】本协议服务于皮皮笼微信小程序，仅用于此微信小程序。本协议内容同时包括电巴克可能不断发布的关于本服务的相关协议、业务规则等内容。内容一经正式发布，即为本服务不可分割的组成部分。\n\
三、关于本服务\n\
　　临时寄存服务，指按照电巴克的指定方式支付一定购卡服务费用之后，用户可以享有由电巴克或第三方提供的在电巴克产品、生活等方面特权的服务，简称为：本服务。\n\
　　电巴克可能会根据不同的产品及服务类型，推出不同的购卡充值服务，目前，电巴克提供周卡、月卡、季卡、年卡等不同种类的购卡充值服务，同时，电巴克也可能会根据用户的需求、产品及服务类型的变化等，对现有购卡充值服务种类进行调整以及不断推出新的购卡充值服务种类。电巴克也可能会在不同时间推出具体不同的服务内容，以不断完善、优化本服务。具体购卡充值服务种类及服务内容以相关服务页面公布、实际提供的内容为准。您可以自行根据需要选择相应服务。\n\
您所享有的本服务的具体内容可能会因为级别、是否年费、开通期限、您选择的具体服务类别等因素而有不同，通常高级别、开通年费服务、开通期限较长等情况下，您将会享有更多的服务，具体以相关服务页面公布、实际提供的内容为准。\n\
如何使用本服务呢？\n\
1.	注册登录即普通会员，购卡可选择不同种类，目前分为周卡、月卡、季卡、年卡；\n\
2.	扫码开锁，寄存服务开始；\n\
3.	添加自己的宠物信息，必须填写联系人，如果出现异常情况，可以及时联系到用户；\n\
4.	结账之前可以随意开锁关锁，便于需要多次使用的用户；\n\
5.	结账后，服务结束；\n\
6.	关于使用前，用户最好在主页面查看宠笼的使用情况，避免携带宠物出门后，发现没地方存放的问题。目前平台支持查看当前附近某个具体宠笼的使用情况，如果正在使用，可以排队预定；\n\
7.	关于卫生问题，电巴克努力做好宠笼的卫生状况，用户在使用前需要先进行消毒处理，然后铺设一张垫纸，服务结束前，需要拿走底部的垫纸，然后关锁结账，直到服务结束。如果未及时清理，遭到下一个客户举报，你会被扣除对应信用分，这对你后期使用服务有很大影响；\n\
8.	使用前无法开锁，或发现宠笼故障时，请联系客户处理，宠笼门口有联系方式，或及时在系统上报；\n\
9.	使用过程中无法开锁关锁时，无法结账时，请联系客服处理，及时上报遇到的情况；\n\
服务过程中遇到突发情况？\n\
电巴克列举了一下，并给出解决方案：\n\
1.	如果用户存放宠物时间过长，超过4小时，平台会给用户打电话，提醒用户，如果联系不上，仍然存放在笼子内，电巴克有权作出对应决策，并且如果宠物有什么问题，后果由使用者承担；\n\
2.	笼子里面已经准备了消毒杀菌液、清理异物纸张等卫生措施，请在使用服务前，提前检查自己宠物的身体情况，并做好笼子的消毒、清洁处理，如果宠物在笼子内出现呕吐、腹泻、抽搐等异常情况，甚至死亡，本公司概不负责；\n\
四、权利义务\n\
1.	【关于收费】本服务是电巴克提供的收费服务，您须在按照本服务的收费标准支付相应费用后，方可使用本服务。此外，您也可以通过接受好友赠送等电巴克认可的其他方式享有、使用本服务。电巴克可能会根据本服务的整体规划，对本服务的收费标准、方式等进行修改和变更，前述修改、变更，电巴克将在相应服务页面进行展示。您若需要获取、使用本服务，请先提前了解清楚当时关于本服务的收费标准、方式等信息。\n\
2.	【服务开通】您应该通过电巴克指定的微信支付方式、今后电巴克指定方式在依约支付一定费用后开通本服务。本服务开通之后，不可进行转让。您理解并同意：对于通过手机短信方式开通本服务的用户，为了保护手机用户的帐户安全、保障用户权益，电巴克有权对手机用户的交易及使用行为进行独立判断。如果电巴克根据一般的常识判断认为可能存在风险，您将无法完成重复开通的操作，对于前述由于电巴克采取的相关措施导致您可能无法开通本服务或可能给您造成损失的，您同意自行承担相关责任和损失。\n\
3.	【服务期限】本服务的服务期限以您自行选择并支付相应服务费用的期限为准，您也可以登陆电巴克充值中心或者本服务的相应页面查询。本服务的服务开通最高期限会受到一定限制，具体以电巴克制定的的规则为准。\n\
4.	【行为规范】\n\
a.	【五不准】您在使用本服务时不得利用本服务从事以下行为，包括但不限于：\n\
i.	发布、传送、传播、储存违反国家法律、危害国家安全统一、社会稳定、公序良俗、社会公德以及侮辱、诽谤、淫秽、暴力的内容；\n\
ii.	发布、传送、传播、储存侵害他人名誉权、肖像权、知识产权、商业秘密等合法权利的内容；\n\
iii.	虚构事实、隐瞒真相以误导、欺骗他人；\n\
iv.	发表、传送、传播广告信息及垃圾信息；\n\
v.	从事其他违反法律法规、政策及公序良俗、社会公德等的行为。\n\
b.	【用户禁止行为】本服务仅供您个人使用，除非经电巴克书面许可，您不得进行以下行为：\n\
i.	通过任何方式搜集本服务中其他用户的用户名、电子邮件、手机号等相关信息，并以发送垃圾邮件、连锁邮件、垃圾短信、即时消息等方式干扰、骚扰其他用户；\n\
ii.	通过本服务发布包含广告、宣传、促销等内容的信息；\n\
iii.	将本服务再次许可他人使用；\n\
iv.	其他未经电巴克书面许可的行为。\n\
c.	【对自己行为负责】您充分了解并同意，您必须为自己注册帐号下的一切行为负责，包括但不限于您所发表的任何内容以及由此产生的任何后果。您应对本服务中的内容自行加以判断，并承担因使用内容而引起的所有风险，包括因对内容的正确性、完整性或实用性的依赖而产生的风险。\n\
5.	【服务的变更、中止或终止】 您充分了解并同意，由于互联网服务的特殊性，电巴克可能会按照相关法规、双方约定或在其他必要时，中止或终止向您提供本服务，届时，电巴克会依法保护您的合法权益。\n\
五、违约责任\n\
1.	如果电巴克发现或收到他人举报您有违反本协议任何行为的，电巴克有权依法进行独立判断并采取技术手段予以删除、屏蔽或断开相关的信息。同时，电巴克有权视您的行为性质，对您采取包括但不限于暂停或终止部分或全部本服务、中止或终止您对账号使用、追究您法律责任等措施，电巴克也无需向您退还任何费用，而由此给您带来的损失（包括但不限于通信中断、相关数据清空、未使用的服务费用作为违约金而归电巴克所有等），由您自行承担，造成电巴克损失的，您也应予以赔偿。\n\
2.	对第三方损害的处理：您有违反本协议任何行为，导致任何第三方损害的，您应当独立承担责任；电巴克因此遭受损失的，您也应当一并赔偿。\n\
六、其他\n\
1.	协议的生效：您使用本服务即视为您已阅读并同意受本协议的约束。\n\
2.	协议签订地：本协议签订地为中华人民共和国北京市海淀区。\n\
3.	适用法律：本协议的成立、生效、履行、解释及纠纷解决，适用中华人民共和国大陆地区法律（不包括冲突法）。\n\
4.	争议解决：若您和电巴克之间发生任何纠纷或争议，首先应友好协商解决；协商不成的，您同意将纠纷或争议提交本协议签订地有管辖权的人民法院管辖。\n\
5.	条款标题：本协议所有条款的标题仅为阅读方便，本身并无实际涵义，不能作为本协议涵义解释的依据。\n\
6.	条款效力：本协议条款无论因何种原因部分无效或不可执行，其余条款仍有效，对双方具有约束力。\n\
\n\
　　(正文完)\n\
\n\
上海电巴克宠物服务有限公司  \n\
\n\
\n\
\n\
隐私保护协议\n\
\n\
\n\
          一、概述\n\
          本协议适用于所有使用“皮皮笼”微信小程序（以下简称本软件）所提供的服务等相关事宜所订立的契约，请您仔细阅读本注册协议，您点击“我已阅读并同意《皮皮笼服务协议》“，本协议即构成对双方有约束力的法律文件。\n\
          我们深知个人信息对您的重要性，并会尽全力保护您的个人信息安全可靠。我们致力于维持您对我们的信任，恪守以下原则，保护您的个人信息：权责一致原则、目的明确原则、选择同意原则、最少够用原则、确保安全原则、主体参与原则、公开透明原则等。同时，我们承诺，我们将按业界成熟的安全标准，采取相应的安全保护措施来保护您的个人信息。\n\
          请在使用我们的产品（或服务）前，仔细阅读并了解本《隐私权政策》。\n\
          二、 本软件服务条款的确认和接纳\n\
          1.本软件各项服务的所有权和运作权归皮皮笼拥有。\n\
          2.如果您在18周岁以下，您必须在父母或监护人的监护参与下才能使用本软件的各种功能。\n\
          3.如您已阅读并同意《皮皮笼服务协议》成功注册后，即可以享受皮皮笼宠物临时寄存服务。通过参与皮皮笼定期及不定期举行的活动，都将获得相应的积分奖励。您的参加的活动越多，达成目标越多，获得的积分值也将更多。积分不仅可以兑换皮皮笼礼品，还可以享受更多的会员服务。\n\
          三、 隐私保护\n\
          1.保护用户隐私是本软件的一项基本义务。“隐私”是指用户在账号验证时提供给本软件的个人身份信息，包括用户提交的姓名、性别、联系方式、家庭住址、地理位置、证件号码等，以及验证通过后使用本软件后产生的服务等信息。本软件保证不对外公开或向第三方提供用户资料及用户在使用网络服务时存储在本软件的非公开内容，但下列情况除外：\n\
          （1）用户或用户监护人授权本软件披露的；\n\
          （2）应用户监护人的合法要求而提供用户个人身份信息时；\n\
          （3）有关法律要求本软件披露的；\n\
          （4）司法机关或行政机关基于法律程序要求本软件提供的；\n\
          （5）本软件为了维护自己合法权益而向用户提起诉讼或者仲裁时；\n\
          （6）本软件出于软件正常使用、学术交流及讨论的目的时。\n\
          2.本软件可能会与第三方合作为用户提供相关的网络服务，在此情况下，如该第三方同意承担与本软件同等的保护用户隐私的责任，则本软件可将用户的注册资料（包括姓名、性别、个人有效身份证件号码、联系方式、家庭住址、地理位置等）提供给该第三方。\n\
          3.在不透露单个用户隐私资料的前提下，本软件有权对整个用户数据库进行分析并对用户数据进行商业上的应用。\n\
          四、我们如何保护您的个人信息\n\
          1.我们已使用符合业界标准的安全防护措施保护您提供的个人信息，防止数据遭到未经授权访问、公开披露、使用、修改、损坏或丢失。我们会采取一切合理可行的措施，保护您的个人信息。例如，在您的手机与“服务”之间交换数据（如交易信息）时受 SSL 加密保护；我们同时对服务提供 https 安全访问方式；我们会使用加密技术确保数据的保密性；我们会使用受信赖的保护机制防止数据遭到恶意攻击；我们会部署访问控制机制，确保只有授权人员才可访问个人信息；以及我们会举办安全和隐私保护培训课程，加强员工对于保护个人信息重要性的认识。\n\
          2.我们会采取一切合理可行的措施，确保未收集无关的个人信息。我们只会在达成本政策所述目的所需的期限内保留您的个人信息，除非需要延长保留期或受到法律的允许。 \n\
          3.互联网并非绝对安全的环境，而且电子邮件、即时通讯、及与其他我们用户的交流方式并未加密，我们强烈建议您不要通过此类方式发送个人信息。请使用复杂密码，协助我们保证您的账号安全。 \n\
          4.互联网环境并非百分之百安全，我们将尽力确保或担保您发送给我们的任何信息的安全性。如果我们的物理、技术、或管理防护设施遭到破坏，导致信息被非授权访问、公开披露、篡改、或毁坏，导致您的合法权益受损，我们将承担相应的法律责任。 \n\
          5.在不幸发生个人信息安全事件后，我们将按照法律法规的要求，及时向您告知：安全事件的基本情况和可能的影响、我们已采取或将要采取的处置措施、您可自主防范和降低风险的建议、对您的补救措施等。我们将及时将事件相关情况以邮件、信函、电话、推送通知等方式告知您，难以逐一告知个人信息主体时，我们会采取合理、有效的方式发布公告。 同时，我们还将按照监管部门要求，主动上报个人信息安全事件的处置情况。\n\
          五、您的权利\n\
          按照中国相关的法律、法规、标准，以及其他国家、地区的通行做法，我们保障您对自己的个人信息行使以下权利： \n\
          1.访问您的个人信息：您有权访问您的个人信息，法律法规规定的例外情况除外。如果您想行使数据访问权，可以通过查询用户中心方式自行访问： \n\
          2.账户信息：如果您希望访问或编辑您的账户中的个人资料信息和支付信息、更改您的密码、添加安全信息或关闭您的账户等，您可以通过访问用户中心执行此类操作。 \n\
          3.搜索信息：您可以在用户中心中访问或清除您的搜索历史记录、查看和修改个人使用记录、浏览记录及管理其他数据。 如果您无法通过上述链接访问这些个人信息，发送电子邮件至chenzuoli709@163.com。我们将在30天内回复您的访问请求。 对于您在使用我们的产品或服务过程中产生的其他个人信息，只要我们不需要过多投入，我们会向您提供。如果您想行使数据访问权，请发送电子邮件至【chenzuoli709@163.com】。 \n\
          4.更正您的个人信息：当您发现我们处理的关于您的个人信息有错误时，您有权要求我们做出更正。您可以通过“（一）访问您的个人信息”中罗列的方式提出更正申请。 如果您无法通过上述链接更正这些个人信息，您可以随时使用我们联系，或发送电子邮件至chenzuoli709@163.com。我们将在30天内回复您的更正请求。 \n\
          5.删除您的个人信息：在以下情形中，您可以向我们提出删除个人信息的请求：\n\
          a.如果我们处理个人信息的行为违反法律法规；\n\
          b.如果我们收集、使用您的个人信息，却未征得您的同意； \n\
          c.如果我们处理个人信息的行为违反了与您的约定； \n\
          d.如果您不再使用我们的产品或服务，或您注销了账号； \n\
          e.如果我们不再为您提供产品或服务。 若我们决定响应您的删除请求，我们还将同时通知从我们获得您的个人信息的实体，要求其及时删除，除非法律法规另有规定，或这些实体获得您的独立授权。 当您从我们的服务中删除信息后，我们可能不会立即备份系统中删除相应的信息，但会在备份更新时删除这些信息。 \n\
          6.改变您授权同意的范围：每个业务功能需要一些基本的个人信息才能得以完成（见本策略“第一部分”）。对于额外收集的个人信息的收集和使用，您可以随时给予或收回您的授权同意。 您可以通过以下方式自行操作：  当您收回同意后，我们将不再处理相应的个人信息。但您收回同意的决定，不会影响此前基于您的授权而开展的个人信息处理。 如果您不想接受我们给您发送的商业广告，您随时可通过以下方式取消。\n\
          7.个人信息主体注销账户：您随时可注销此前注册的账户，您可以通过联系我们的方式进行注销操作。在注销账户之后，我们将停止为您提供产品或服务，并依据您的要求，删除您的个人信息，法律法规另有规定的除外。 \n\
          8.个人信息主体获取个人信息副本：您有权获取您的个人信息副本，您可以通过联系我们获取，在技术可行的前提下，例如数据接口匹配，我们还可按您的要求，直接将您的个人信息副本传输给您指定的第三方。 \n\
          9.约束信息系统自动决策：在某些业务功能中，我们可能仅依据信息系统、算法等在内的非人工自动决策机制做出决定。如果这些决定显著影响您的合法权益，您有权要求我们做出解释，我们也将提供适当的救济方式。 \n\
          10.响应您的上述请求：为保障安全，您可能需要提供书面请求，或以其他方式证明您的身份。我们可能会先要求您验证自己的身份，然后再处理您的请求。 我们将在三十天内做出答复。如您不满意，还可以通过联系我们邮箱发送反馈内容。对于您合理的请求，我们原则上不收取费用，但对多次重复、超出合理限度的请求，我们将视情收取一定成本费用。对于那些无端重复、需要过多技术手段（例如，需要开发新系统或从根本上改变现行惯例）、给他人合法权益带来风险或者非常不切实际（例如，涉及备份磁带上存放的信息）的请求，我们可能会予以拒绝。 在以下情形中，按照法律法规要求，我们将无法响应您的请求： \n\
          a.与国家安全、国防安全有关的； \n\
          b.与公共安全、公共卫生、重大公共利益有关的； \n\
          c.与犯罪侦查、起诉和审判等有关的； \n\
          d.有充分证据表明您存在主观恶意或滥用权利的； \n\
          e.响应您的请求将导致您或其他个人、组织的合法权益受到严重损害的。\n\
          六、 免责声明\n\
          1.郑重提醒使用者：本软件所提供的所有信息仅供参考，不做个别诊断、用药和使用的依据，一切因使用本软件而造成的任何意外、损失或损害，均由信息使用方自行负责，本软件概不负责，亦不承担任何直接的、间接的、特殊的、连带的法律责任。此外，本软件致力于提供正确、完整的健康及医疗信息，但不保证信息的正确性、准确性、可靠性、时效性和完整性，不对信息做出任何种类的保证，信息也许已经过期，本软件不承诺予以定期、及时地更新。\n\
          2.本软件所刊载的各类形式（包括但不限于文字、图片、图表）的作品（包括广告等）仅供参考，并不代表本软件同意其说法或描述，也不构成任何方面的建议。对于用户根据本软件提供的信息所做出的一切行为，除非另有明确的书面承诺文件，否则本软件不承担任何形式的责任。\n\
          3.凡在本软件登记注册的用户，须自行负责对您的账号和密码保密的责任，且须对您的账号和密码下所发生的所有活动承担全部责任。\n\
          4.权利人自愿同意不做任何妨碍或者破坏服务（或与服务链接的服务器及网络）的任何活动。若因散布谣言、造假、谩骂等原因而被禁止本软件对其服务的，本软件均免责。\n\
          5.当政府部门、司法机关等依照法定程序要求本软件披露个人资料时，本软件将根据执法单位之要求或为公共安全之目的提供个人资料。在此情况下之任何披露，本软件均免责。\n\
          6.由于与本软件链接的其他软件或网页所造成的个人资料泄露及由此而导致的任何法律争议和后果，本软件均免责。\n\
          7.由于用户将个人密码告知他人或与他人共享注册账户，由此导致的任何个人资料泄露，本软件均免责。\n\
          8.任何由于黑客攻击、计算机病毒侵入或发作、因政府管制而造成的暂时性关闭等影响网络正常运营的不可抗力造成的个人资料泄露、丢失、被盗用或被篡改等，本软件均免责。\n\
          9.除本软件注明的服务条款外，其他一切因使用本软件导致的任何意外、疏忽、诽谤、版权或知识产权侵犯及其所造成的损失（包括因下载而感染手机病毒），本软件不承担任何法律责任。\n\
          10.用户自行同意本软件可自行更新、升级或关闭，而无需经过您的同意。您可在任何时候停止使用本款软件，无需提出任何特别通知。\n\
          11.用户明确同意对本软件服务的使用承担全部风险，并对因其使用本软件服务而产生的一切后果承担全部风险，本软件明确表示对用户不做任何类型的担保，也不承担任何责任，但是对商业性的隐含担保，特定目的和不违反规定的适当担保除外。本软件不承担网络服务一定能满足用户的要求，也不担保网络服务不会中断，对服务的连续性、及时性、安全性、准确性都不做担保。对于因不可抗力或本软件不能避免或控制的原因及其他原因造成的网络服务中断或其他缺陷，本软件不承担任何责任。\n\
          七、 法律责任\n\
          1.凡以任何方式登录本软件或直接、间接使用本软件者，均视为自愿同意本软件声明的约束。\n\
          2.本声明未涉及的问题参见中华人民共和国有关法律法规，当本声明与中华人民共和国法律法规冲突时，以中华人民共和国法律法规为准。\n\
          八、 版权声明\n\
          本软件受《中华人民共和国著作权法》、《计算机软件保护条例》和相关的国际条约以及其他的法律法规保护，任何单位和个人未经授权不能拷贝、制作、修改、破解、出售、交易、转售、再发布本软件及其任何部分，或对本软件或本软件的任何部分创作衍生作品，进行反工程、反编辑或试图从本软件或本软件的任何部分提取源代码，但法律明确允许或要求的或本软件特别授权您的除外。否则将视为非法侵害，我们将保留依法追究其责任的权利。\n\
          九、 服务条款的修改\n\
          本软件有权在必要时修改服务条款，本软件服务条款一旦发生变动，将会在重要页面上提示修改内容。如果不同意所改动的内容，用户可以主动取消获得的本软件信息服务。如果用户继续享用本软件信息服务，则视为接受服务条款的变动。本软件保留随时修改或中断服务。\n\
          十、 法律适用与司法管辖\n\
          本协议之效力、解释、执行和争议的解决均适用中华人民共和国之法律。如本协议之任何一部分与中华人民共和国法律相抵触，则该部分条款应按有关法律规定重新解释，部分条款之无效或重新解释不影响其他条款之法律效力。您和本软件运营方一致同意凡因本协议所产生的纠纷双方应协商解决。协商不成时，任何一方可提交本软件运营方所在地法院诉讼裁决。\n\
          \n\
          \n\
          上海电巴克宠物服务有限公司\n\
          "
    })
  },
  //姓名输入
  bindNameInput(e) {
    this.setData({
      name: e.detail.value
    })
  },
  //手机号输入
  bindPhoneInput(e) {
    console.log(e.detail.value);
    var val = e.detail.value;
    this.setData({
      phone: val
    })
    if (val != '') {
      this.setData({
        hidden: false,
        btnValue: '获取验证码'
      })
    } else {
      this.setData({
        hidden: true
      })
    }
  },
  //验证码输入
  bindCodeInput(e) {
    this.setData({
      code: e.detail.value
    })
  },
  //获取短信验证码
  getCode(e) {
    console.log('获取验证码');
    var that = this;
    wx.request({
      url: this.get_code_url,
      data: {
        phone: that.phone
      },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        'content-type': 'application/json'
      }, // 设置请求的 header
      success: function (res) {
        // success
        wx.showToast({
          title: '发送成功',
          icon: 'success',
          duration: 1000
        })
        console.log('服务器返回: ' + res.data);
        if (res.data == 0) {
          that.timer();
          return;
        }
      },
      fail: function () {
        // fail
        wx.showToast({
          title: '发送失败',
          icon: 'warn',
          duration: 1000
        })
      },
      complete: function () {
        // complete
      }
    })
  },
  timer: function () {
    let promise = new Promise((resolve, reject) => {
      let setTimer = setInterval(
        () => {
          var second = this.data.second - 1;
          this.setData({
            second: second,
            btnValue: second + '秒',
            btnDisabled: true
          })
          if (this.data.second <= 0) {
            this.setData({
              second: 60,
              btnValue: '获取验证码',
              btnDisabled: false
            })
            resolve(setTimer)
          }
        }, 1000)
    })
    promise.then((setTimer) => {
      clearInterval(setTimer)
    })
  },
  //保存
  async save(e) {
    var that = this
    console.log('姓名: ' + this.data.name);
    console.log('手机号: ' + this.data.phone);
    console.log('验证码: ' + this.data.code);

    // 展示服务条例与隐私协议
    // await that.show_service_private_content()
    if (that.data.is_agree == '0') {
      return
    }
    //注册，请求后台
    await that.register()
  },
  get_service_private_content() {
    var that = this
    return new Promise((resolve, reject) => {
      wx.request({
        url: get_service_private_content,
        method: 'post', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        header: {
          'content-type': 'application/json'
        }, // 设置请求的 header
        success(res) {
          console.log("获取服务条例与隐私协议成功")
          that.setData({
            service_content: res.data.data.service_content,
            private_content: res.data.data.private_content
          })
          resolve(res)
        },
        fail(err) {
          console.log("获取服务条例与隐私协议失败")
          console.log(err)
          reject(err)
        }
      })
    })
  },
  show_service_private_content() {
    var that = this
    return new Promise((resolve, reject) => {
      wx.showModal({
        title: that.data.title,
        content: that.data.service_content + "\n" + that.data.private_content,
        showCancel: true, //是否显示取消按钮
        cancelText: "取消", //默认是“取消”
        cancelColor: 'skyblue', //取消文字的颜色
        confirmText: "同意", //默认是“确定”
        confirmColor: 'skyblue', //确定文字的颜色
        success: function (res) {
          if (res.confirm) {
            that.setData({
              is_agree: "1"
            })
          }
          resolve(res)
        },
        fail: function (err) {
          console.log("展示服务条例与隐私协议失败")
          console.log(err)
          reject(err)
        }
      })
    })
  },
  register() {
    var that = this
    return new Promise((resolve, reject) => {
      wx.request({
        url: '',
        data: {
          phone: this.data.phone,
          sms_code: this.data.code
        },
        method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        header: {
          'content-type': 'application/json'
        }, // 设置请求的 header
        success: function (res) {
          // success
          wx.showToast({
            title: '注册成功',
            icon: 'success',
            duration: 1000
          })
          console.log('服务器返回' + res.data);
          wx.navigateTo({
            url: '../login/login',
          })
          resolve(res)
        },
        fail: function (err) {
          // fail
          wx.showToast({
            title: '注册失败',
            icon: 'warn',
            duration: 1000
          })
          console.log("注册失败")
          console.log(err)
          reject(err)
        },
      })
    })
  },
  onGotUserInfo: async function (e) {
    var that = this;
    console.log(e.detail.errMsg)
    console.log(e.detail.userInfo)
    console.log(e.detail.rawData)
    that.setData({
      rawData: e.detail.rawData,
      userInfo: e.detail.userInfo
    })
    // 展示服务条例与隐私协议
    // await that.show_service_private_content()
    if (that.data.is_agree == '0') {
      return
    }
    // 注册
    await that.login()
  },
  login: function () {
    var that = this
    return new Promise((resolve, reject) => {
      wx.login({
        success(res) {
          console.log(that.data.rawData)
          console.log(that.data.userInfo)
          wx.request({
            url: wx_login_url,
            data: {
              js_code: res.code,
              rawData: that.data.rawData
            },
            success(res) {
              console.log("注册成功")
              wx.showToast({
                title: '注册成功',
                icon: "success",
                duration: 1000
              })
              wx.navigateTo({
                url: '../login/login',
              })
            },
            fail(err) {
              console.log("注册失败")
              wx.showToast({
                title: '注册失败',
                icon: "warn",
                duration: 1000
              })
            }
          })
          resolve(res)
        },
        fail(err) {
          console.log("注册失败")
          console.log(err)
          wx.showToast({
            title: '注册失败',
            icon: "warn",
            duration: 1000
          })
          reject(err)
        }
      })
    })
  },
  // 点击取消按钮的回调函数
  modalCancel(e) {
    // 这里面处理点击取消按钮业务逻辑
    console.log('点击了取消，跳回登录页')
    wx.navigateTo({
      url: '../login/login'
    })
  },
  // 点击确定按钮的回调函数
  modalConfirm(e) {
    var that = this
    // 这里面处理点击确定按钮业务逻辑
    console.log('点击了确定，继续填写注册信息。')
    that.setData({
      is_agree: "1"
    })
  }
})