<#import "template.ftl" as layout>
<@layout.registrationLayout displayMessage=!messagesPerField.existsError('username','password') displayInfo=realm.password && realm.registrationAllowed && !registrationDisabled??; section>
    <div class="topmostclass">
    <#if section = "header">
    
    <div class ="signinsection">
    Login 
    </div>
    <#elseif section = "form">
    <div class ="formsection">
    
    <div id="kc-form">
      <div id="kc-form-wrapper">
        <#if realm.password>
            
		<form  class="form" id="kc-form-login" onsubmit="login.disabled = true; return true;" action="${url.loginAction}" method="post">
                <table>
					<tr>
			<#if !usernameHidden??>
				<div class="${properties.kcFormGroupClass!}">
					
					<td class = "table-left" style="width: 15%;" ><label for="username" class="${properties.kcLabelClass!}">
<i class="fa fa-2x fa-user"></i> 
</label>
</td>
<td class = "table-right">					
<input placeholder="<#if !realm.loginWithEmailAllowed>${msg("username")}<#elseif !realm.registrationEmailAsUsername>${msg("usernameOrEmail")}<#else>${msg("email")}</#if>" tabindex="1" id="username" class="${properties.kcInputClass!} form__input" name="username" value="${(login.username!'')}"  type="text" autofocus autocomplete="off"
						   aria-invalid="<#if messagesPerField.existsError('username','password')>true</#if>"
					/>

					<#if messagesPerField.existsError('username','password')>
						<span id="input-error" class="${properties.kcInputErrorMessageClass!}" aria-live="polite">
								${kcSanitize(messagesPerField.getFirstError('username','password'))?no_esc}
						</span></td>
					</#if>

				</div>
			</#if>
		</tr>
		<tr>
			<div class="${properties.kcFormGroupClass!}">
				<td class = "table-left">
				<label for="password" class="${properties.kcLabelClass!}"><i class="fa fa-2x fa-key"></i> </label>
			</td>
			<td class = "table-right">
				<input placeholder="Password?" tabindex="2" id="password" class="${properties.kcInputClass!} form__input" name="password" type="password" autocomplete="off"
					   aria-invalid="<#if messagesPerField.existsError('username','password')>true</#if>"
				/>

				<#if usernameHidden?? && messagesPerField.existsError('username','password')>
					<span id="input-error" class="${properties.kcInputErrorMessageClass!}" aria-live="polite">
							${kcSanitize(messagesPerField.getFirstError('username','password'))?no_esc}
					</span>
				</#if>
			</td>
			</div>
		</tr>
		
			<div class="${properties.kcFormGroupClass!} ${properties.kcFormSettingClass!}">
				<div id="kc-form-options">
					<#if realm.rememberMe && !usernameHidden??>
						<tr rowspan="2">
    <td class = "table-left">
        <div class="checkbox">
            <#if login.rememberMe??>
                <input tabindex="3" id="rememberMe" name="rememberMe" type="checkbox" checked> 
                <label for="rememberMe">
                    <i class="fa fa-check"></i>
                </label>
            <#else> 
                <input tabindex="3" id="rememberMe" name="rememberMe" type="checkbox"> 
                <label for="rememberMe" style="padding-left: 0px;">
                    <i class="fa fa-check"></i>
                </label>
            </#if>
        </div>
    </td>
    <td class = "table-right">
        Remember Me
    </td>
</tr>

					</#if>
					</div>
				
				<tr>
					<td class="table-forgot" style="width: 10%;">
					<div class="${properties.kcFormOptionsWrapperClass!}">
						<#if realm.resetPasswordAllowed>
							<span><a tabindex="5" href="${url.loginResetCredentialsUrl}">${msg("doForgotPassword")}</a></span>
						</#if>
					</div>
				    </td>
				</tr>
			  </div>
<tr><td colspan="2">
			  <div id="kc-form-buttons" class="${properties.kcFormGroupClass!}">
				  <input type="hidden" id="id-hidden-input" name="credentialId" <#if auth.selectedCredential?has_content>value="${auth.selectedCredential}"</#if>/>
				  <button tabindex="4" class="${properties.kcButtonClass!} ${properties.kcButtonPrimaryClass!} ${properties.kcButtonBlockClass!} ${properties.kcButtonLargeClass!} btnn btnn-shine" name="login" id="kc-login" type="submit">
${msg("doLogIn")} 
</button>

				  </div>
				</td></tr>
				</table>
		</form>
        </#if>
        </div>

    </div>
    </div>
    <#elseif section = "info" >
        <#if realm.password && realm.registrationAllowed && !registrationDisabled??>
            <div id="kc-registration-container">
                <div id="kc-registration">
                    <span>${msg("noAccount")} <a tabindex="6"
                                                 href="${url.registrationUrl}">${msg("doRegister")}</a></span>
                </div>
            </div>
        </#if>
    <#elseif section = "socialProviders" >
        <#if realm.password && social.providers??>
            <div id="kc-social-providers" class="${properties.kcFormSocialAccountSectionClass!}">
                <hr/>
                <h4>${msg("identity-provider-login-label")}</h4>

                <ul class="${properties.kcFormSocialAccountListClass!} <#if social.providers?size gt 3>${properties.kcFormSocialAccountListGridClass!}</#if>">
                    <#list social.providers as p>
                        <a id="social-${p.alias}" class="${properties.kcFormSocialAccountListButtonClass!} <#if social.providers?size gt 3>${properties.kcFormSocialAccountGridItem!}</#if>"
                                type="button" href="${p.loginUrl}">
                            <#if p.iconClasses?has_content>
                                <i class="${properties.kcCommonLogoIdP!} ${p.iconClasses!}" aria-hidden="true"></i>
                                <span class="${properties.kcFormSocialAccountNameClass!} kc-social-icon-text">${p.displayName!}</span>
                            <#else>
                                <span class="${properties.kcFormSocialAccountNameClass!}">${p.displayName!}</span>
                            </#if>
                        </a>
                    </#list>
                </ul>
            </div>
        </#if>
    </#if>
</div>
</@layout.registrationLayout>
