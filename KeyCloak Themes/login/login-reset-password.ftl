<#import "template.ftl" as layout>
<@layout.registrationLayout displayInfo=true displayMessage=!messagesPerField.existsError('username'); section>
    <div style="display: flex; justify-content: center; margin: 0; padding:0;">
    <#if section = "header">
    <center>FORGOT PASSWORD?</center>
    <#elseif section = "form">
        <form id="kc-reset-password-form" class="${properties.kcFormClass!}" action="${url.loginAction}" method="post"  >
            <table class="tablereg" >
                <tr>
                <td>
            <div class="${properties.kcFormGroupClass!}">
                
                <div class="${properties.kcInputWrapperClass!}">
                    <input placeholder="<#if !realm.loginWithEmailAllowed>${msg("username")}<#elseif !realm.registrationEmailAsUsername>${msg("usernameOrEmail")}<#else>${msg("email")}</#if>"type="text" id="username" name="username" class="${properties.kcInputClass!} form__input" autofocus value="${(auth.attemptedUsername!'')}" aria-invalid="<#if messagesPerField.existsError('username')>true</#if>"/>
                    <#if messagesPerField.existsError('username')>
                        <span id="input-error-username" class="${properties.kcInputErrorMessageClass!}" aria-live="polite">
                                    ${kcSanitize(messagesPerField.get('username'))?no_esc}
                        </span>
                    </#if>
                </div>
            </div>
            
            </td></tr>
            
                <tr>
                <td>
            <div class="${properties.kcFormGroupClass!} ${properties.kcFormSettingClass!}">
                
                <div id="kc-form-options" class="${properties.kcFormOptionsClass!}">
                    <div class="${properties.kcFormOptionsWrapperClass!}">
                        <span><a href="${url.loginUrl}">${kcSanitize(msg("backToLogin"))?no_esc}</a></span>
                    </div>
                </div>
            </td></tr>
                <tr>
                <td>
                <div id="kc-form-buttons" class="${properties.kcFormButtonsClass!}">
                    <button class="btnn btnn-shine ${properties.kcButtonClass!} ${properties.kcButtonPrimaryClass!} ${properties.kcButtonBlockClass!} ${properties.kcButtonLargeClass!}" type="submit">${msg("doSubmit")}</button>
                </div>
            </div>
            </td></tr>
            </table>
        </form>
    <#elseif section = "info" >
        <#if realm.duplicateEmailsAllowed>
            ${msg("emailInstructionUsername")}
        <#else>
            ${msg("emailInstruction")}
        </#if>
    </#if>
    </div>
</@layout.registrationLayout>
