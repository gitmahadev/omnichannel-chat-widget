import { LiveChatWidget } from '@microsoft/omnichannel-chat-widget';
//Below version numbers will help us to troubleshoot issues with specific package
// import { version as chatSdkVersion } from "@microsoft/omnichannel-chat-sdk/package.json";
// import { version as chatWidgetVersion } from "./../../package.json";
// import { version as chatComponentVersion } from "@microsoft/omnichannel-chat-components/package.json";
import { OmnichannelChatSDK } from '@microsoft/omnichannel-chat-sdk';
import { useEffect } from 'react';
import * as React from 'react';

export function LCW_ChatButtonStateful() {
    const omnichannelConfig = {
        orgId: "00000000-0000-0000-0000-000000000000", // dummy config
        orgUrl: "https://www.org-url.com", // dummy config
        widgetId: "00000000-0000-0000-0000-000000000000" // dummy config
    };
    let chatSDK = new OmnichannelChatSDK(omnichannelConfig);
    let chatConfig; 
    
    const getLiveChatConfig = async () => {
        chatSDK = new OmnichannelChatSDK(omnichannelConfig);
        await chatSDK.initialize(); // mandatory
        return await chatSDK.getLiveChatConfig();
      };
 
      useEffect(() => {
        chatConfig = getLiveChatConfig();
      }, []);

    const liveChatWidgetProps = {
        styleProps: {
            generalStyles: {
                width: "700px",
                height: "800px"
            }
        },
        headerProps: {
            controlProps: {
                hideMinimizeButton: true
            }
        },
        chatSDK: chatSDK, // mandatory
        chatConfig: chatConfig, // mandatory
        telemetryConfig: { //mandatory
            orgId: omnichannelConfig.orgId,
            orgUrl: omnichannelConfig.orgUrl,
            appId: omnichannelConfig.widgetId,
            OCChatSDKVersion: "0.1.0-main.ea06308",
            chatComponentVersion: "0.1.0-main.ea06308",
            chatWidgetVersion: "0.1.0-main.ea06308"
        }
    };
    return (<LiveChatWidget {...liveChatWidgetProps}/>);
    //return (<div>react App</div>);
}

export default LCW_ChatButtonStateful;
