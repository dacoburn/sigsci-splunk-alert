require([
    'jquery',
    "splunkjs/mvc/simplexml/ready!"
], function(
    $
) {

function return_status_banner() {
    return '<div id="info_banner" class="info">Successfully updated configuration for add-on "TA-SigSci_Blacklist_Alert". </div>' +
    '<div id="save_err_banner" class="error">Fail to update configuration for add-on "TA-SigSci_Blacklist_Alert". </div>' +
    '<div id="load_err_banner" class="error">Fail to load configuration for add-on "TA-SigSci_Blacklist_Alert". </div>';
}

function return_page() {
    return '<div class="entityEditForm"><div class="formWrapper">' +
                '<div class="fieldsetWrapper" id="globalSettingId">' +
                    '<fieldset>' +
                        '<legend>Global Settings</legend>' +
                        '<div class="widget">' +
                            '<label>Logging level</label>' +
                            '<div>' +
                                '<select id="log_level_id">' +
                                    '<option selected="selected" value="INFO">INFO</option>' +
                                    '<option value="DEBUG">DEBUG</option>' +
                                    '<option value="ERROR">ERROR</option>' +
                                '</select>' +
                                '<div class="widgeterror"></div>' +
                            '</div>' +
                        '</div>' +
                    '</fieldset>' +
                '</div>' +
                '<div class="fieldsetWrapper" id="proxySettingId">' +
                    '<fieldset>' +
                        '<legend>Proxy Settings</legend>' +
                        '<div class="checkboxWidget widget">' +
                            '<div>' +
                                '<div class="widgeterror"></div>' +
                                '<div>' +
                                    '<input type="checkbox" id="enable_proxy_id" name="">' +
                                    '<span style="display:inline-block">Enable Proxy</span>' +
                                '</div>' +
                            '</div>' +
                        '</div>' +
                        '<div class="widget" style="display: block;">' +
                            '<div class="proxy">' +
                                '<div class="widget" style="display: block;">' +
                                    '<label>Proxy host</label>' +
                                    '<div>' +
                                        '<input class="index_input" type="text" id="proxy_host_id">' +
                                    '</div>' +
                                    '<div class="widgeterror"></div>' +
                                '</div>' +
                                '<div class="widget" style="display: block;">' +
                                    '<label>Proxy port</label>' +
                                    '<div>' +
                                        '<input class="index_input" type="text" id="proxy_port_id">' +
                                    '</div>' +
                                    '<div class="widgeterror"></div>' +
                                '</div>' +
                                '<div class="widget" style="display: block;">' +
                                    '<label>Proxy username</label>' +
                                    '<div>' +
                                        '<input class="index_input" type="text" id="proxy_username_id">' +
                                    '</div>' +
                                    '<div class="widgeterror"></div>' +
                                '</div>' +
                                '<div class="widget" style="display: block;">' +
                                    '<label>Proxy password</label>' +
                                    '<div>' +
                                        '<input class="index_input" type="password" id="proxy_password_id">' +
                                    '</div>' +
                                    '<div class="widgeterror"></div>' +
                                '</div>' +
                                '<div class="widget" style="display: block;">' +
                                    '<label>Proxy type</label>' +
                                    '<div>' +
                                        '<select id="proxy_type_id">' +
                                            '<option selected="selected" value="http">http</option>' +
                                            '<option value="http_no_tunnel">http_no_tunnel</option>' +
                                            '<option value="socks4">socks4</option>' +
                                            '<option value="socks5">socks5</option>' +
                                        '</select>' +
                                        '<div class="widgeterror"></div>' +
                                    '</div>' +
                                '</div>' +
                                '<div class="widget" style="display: block;">' +
                                    '<div>' +
                                        '<input type="checkbox" id="proxy_rdns_id" name="">' +
                                        '<span style="display:inline-block">Use Proxy to do DNS resolution</span>' +
                                    '</div>' +
                                    '<div class="widgeterror"></div>' +
                                '</div>' +
                            '</div>' +
                        '</div> <!--end of proxy div-->' +
                    '</fieldset>' +
                '</div>' +
                '<div class="fieldsetWrapper" id="email_SettingId">' +
                    '<fieldset>' +
                        '<legend>SigSci Username</legend>' +
                        '<div class="widget" style="display: block;">' +
                            '<label></label>' +
                            '<div>' +
                                '<input class="index_input" type="text" id="email_id">' +
                            '</div>' +
                            '<div class="widgeterror" style="display: none;">' +
                            '</div>' +
                        '</div>' +
                    '</fieldset>' +
                '</div>' +
                '<div class="fieldsetWrapper" id="password_SettingId">' +
                    '<fieldset>' +
                        '<legend>Password</legend>' +
                        '<div class="widget" style="display: block;">' +
                            '<label></label>' +
                            '<div>' +
                                '<input class="index_input" type="password" id="password_id">' +
                            '</div>' +
                            '<div class="widgeterror" style="display: none;">' +
                            '</div>' +
                        '</div>' +
                    '</fieldset>' +
                '</div>' +
                '<div class="fieldsetWrapper" id="corp_SettingId">' +
                    '<fieldset>' +
                        '<legend>SigSci Corp</legend>' +
                        '<div class="widget" style="display: block;">' +
                            '<label></label>' +
                            '<div>' +
                                '<input class="index_input" type="text" id="corp_id">' +
                            '</div>' +
                            '<div class="widgeterror" style="display: none;">' +
                            '</div>' +
                        '</div>' +
                    '</fieldset>' +
                '</div>' +
                '<div class="shadow">' +
                '</div>' +
            '</div> <!-- end of form_wrapper-->' +
            '<div class="jmFormActions" style="">' +
                    '<button class="my-btn-secondary" type="button"><span>Cancel</span></button>' +
                    '<button type="submit" class="my-btn-primary"><span>Save</span></button>' +
            '</div>' +
        '</div></div>';
}

function return_cred_form() {
        return '<div class="dialog">' +
            '<div class="dialog-header pd-16">' +
                'Add New Credentials' +
            '</div>' +
            '<div class="dialog-content pd-16">' +
                '<form autocomplete="off" id="form">' +
                '</form>' +
            '</div>' +
        '</div>';
}


// begin to process the doc
    var appname = Splunk.util.getCurrentApp();
    // load css
    var cssLinks = [ '/en-US/static/css/view.css', '/en-US/static/css/skins/default/default.css', '/en-US/static/css/print.css', '/en-US/static/css/tipTip.css', '/en-US/static/build/css/splunk-components-enterprise.css', '/en-US/static/css/admin.css'];
    for(var i = 0; i < cssLinks.length; i++) {
        $("<link>").attr({
            rel: "stylesheet",
            type: "text/css",
            href: cssLinks[i],
        }).appendTo("head");
    }
    // remove bootstrap-enterprise.css
    $("head").find("link[type='text/css']").each(function(idx) {
        var ele = $(this);
        if (ele.attr('href').indexOf("css/bootstrap-enterprise.css") > 0) {
            ele.remove();
        }
    });
    // generate the html
    $("body").prepend(return_status_banner());
    $('#setup_page_container').html(return_page());
    $('#info_banner').hide();
    $('#save_err_banner').hide();
    $('#load_err_banner').hide();

    var currentAction = "New";

    function htmlEscape(str) {
        return String(str)
                   .replace(/&/g, '&amp;')
                   .replace(/"/g, '&quot;')
                   .replace(/'/g, '&#39;')
                   .replace(/</g, '&lt;')
                   .replace(/>/g, '&gt;');
    }

    function htmlUnescape(value){
        return String(value)
                   .replace(/&quot;/g, '"')
                   .replace(/&#39;/g, "'")
                   .replace(/&lt;/g, '<')
                   .replace(/&gt;/g, '>')
                   .replace(/&amp;/g, '&');
    }

    function isTrue(value) {
        if (value === undefined) {
            return 0;
        }
        value = value.toUpperCase();
        var trues = ["1", "TRUE", "T", "Y", "YES"];
        return trues.indexOf(value) >= 0;
    }

    function setCheckBox(boxId, value) {
        if (value === undefined) {
            value = "0";
        }
        value = value.toLowerCase();
        if (value == "1" || value == "true" || value == "yes") {
            $("#" + boxId).prop("checked", true);
        } else {
            $("#" + boxId).prop("checked", false);
        }
    };

    function showHideProxy() {
        if ($("#enable_proxy_id")[0].checked) {
            $(".proxy").css("display","block");
        } else {
            $(".proxy").css("display","none");
        }
    };

    $("#enable_proxy_id").on("change", showHideProxy);
    showHideProxy();

    function updateGlobalSettings(settings) {
        // Global settings
        if (settings.global_settings === undefined) {
            return;
        }
        $("#log_level_id").val(settings["global_settings"]["log_level"]);

        // Proxy settings
        if (settings.proxy_settings === undefined) {
            return;
        }
        setCheckBox("enable_proxy_id", settings["proxy_settings"]["proxy_enabled"]);
        if (settings["proxy_settings"]["proxy_enabled"] == "1") {
            $(".proxy").css("display","block");
        }
        $("#proxy_host_id").val(settings["proxy_settings"]["proxy_url"]);
        $("#proxy_port_id").val(settings["proxy_settings"]["proxy_port"]);
        $("#proxy_username_id").val(settings["proxy_settings"]["proxy_username"]);
        $("#proxy_password_id").val(settings["proxy_settings"]["proxy_password"]);
        $("#proxy_type_id").val(settings["proxy_settings"]["proxy_type"]);
        setCheckBox("proxy_rdns_id", settings["proxy_settings"]["proxy_rdns"]);
    };


    function updateCustomizedSettings(settings) {
        if (settings.customized_settings === undefined) {
            return;
        }
        if (settings.customized_settings["email"]){
            $("#email_id").val(settings["customized_settings"]["email"]["content"]);
        }
        if (settings.customized_settings["password"]){
            $("#password_id").val(settings["customized_settings"]["password"]["password"]);
        }
        if (settings.customized_settings["corp"]){
            $("#corp_id").val(settings["customized_settings"]["corp"]["content"]);
        }
    };

    function getJSONResult() {
        var result = {};
        // Global Settings
        var log_level = $("#log_level_id").val();
        result["global_settings"] = {
            "log_level": log_level,
        }

        // Proxy Settings
        var proxy_settings = {
            "proxy_enabled": "0",
            "proxy_host": "",
            "proxy_port": "",
            "proxy_username": "",
            "proxy_password": "",
            "proxy_type": "",
            "proxy_rdns": "0",
        }
        var proxy_enabled = $("#enable_proxy_id")[0].checked;
        if (proxy_enabled) {
            proxy_settings["proxy_enabled"] = "1";
            proxy_settings["proxy_url"] = $("#proxy_host_id").val();
            proxy_settings["proxy_port"] = $("#proxy_port_id").val();
            proxy_settings["proxy_username"] = $("#proxy_username_id").val();
            proxy_settings["proxy_password"] = $("#proxy_password_id").val();
            proxy_settings["proxy_type"] = $("#proxy_type_id").val();
            if ($("#proxy_rdns_id")[0].checked) {
                proxy_settings["proxy_rdns"] = "1";
            }
        } else {
            proxy_settings["proxy_enabled"] = "0";
        }
        result["proxy_settings"] = proxy_settings;


        // Customized Settings
        var check_dict = {true:1, false:0}
        var user_defined_settings = {
            "email": {
                "type": "text",
                "content": $("#email_id").val()
            },
            "password": {
                "type": "password",
                "password": $("#password_id").val()
            },
            "corp": {
                "type": "text",
                "content": $("#corp_id").val()
            },
        }
        result["customized_settings"] = user_defined_settings;
        return result;
    };

    function appConfigured() {
        $.ajax({
            url: "/en-US/splunkd/__raw/services/apps/local/TA-SigSci_Blacklist_Alert",
            type: "POST",
            data: {
                "configured": true
            }
        }).done(function() {
            console.log('set configured as true!');
        }).fail(function() {
            console.log('fail to set configured as true!')
        })
    };

    var saving = false;
    $(".my-btn-primary span").html("Save");
    function saveSettings() {
        // var jsonResult = JSON.stringify(getJSONResult());
        $.ajax({
            url:"/en-US/splunkd/__raw/servicesNS/-/TA-SigSci_Blacklist_Alert/TA-SigSci_Blacklist_Alert_input_setup/TA-SigSci_Blacklist_Alert_settings/TA-SigSci_Blacklist_Alert_settings",
            type: "POST",
            data: {
                "all_settings": JSON.stringify(getJSONResult())
            }
        }).done(function() {
            $('#load_err_banner').hide();
            $('#save_err_banner').hide();
            $('#info_banner').show();
            appConfigured();
        }).fail(function() {
            $('#load_err_banner').hide();
            $('#save_err_banner').show();
            $('#info_banner').hide();
        }).always(function() {
            saving = false;
            $(".my-btn-primary span").html("Save");
        });
    };

    $(".my-btn-primary").click(function(e){
        e.preventDefault();
        if (saving) {
            return;
        }
        saving = true;
        $(".my-btn-primary span").html("Saving");
        saveSettings();
    });
    $(".my-btn-secondary").click(function(){
        window.location = "../../manager/launcher/apps/local";
    });

    // TODO: use ajax to load the settings and render the page
    $.ajax({
        url: "/en-US/splunkd/__raw/servicesNS/-/TA-SigSci_Blacklist_Alert/TA-SigSci_Blacklist_Alert_input_setup/TA-SigSci_Blacklist_Alert_settings/TA-SigSci_Blacklist_Alert_settings",
        data: {
            "output_mode": "json"
        },
        type: "GET",
        dataType : "json",
    }).done(function(response) {
        var allSettings = null;
        if (response.entry && response.entry.length > 0) {
            allSettings = $.parseJSON(response.entry[0].content.all_settings);
        }
        // console.log(allSettings);
        //parse the data
        updateGlobalSettings(allSettings);
        updateCustomizedSettings(allSettings);
    }).fail(function(xhr, status, response) {
        $('#load_err_banner').show();
        $('#save_err_banner').hide();
        $('#info_banner').hide();
        console.log(status, response);
    });

}); // the end of require