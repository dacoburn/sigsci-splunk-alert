
# encoding = utf-8

import sys
import requests
import os
import calendar
import json


def process_event(helper, *args, **kwargs):
    """
    # IMPORTANT
    # Do not remove the anchor macro:start and macro:end lines.
    # These lines are used to generate sample code. If they are
    # removed, the sample code will not be updated when configurations
    # are updated.

    [sample_code_macro:start]

    # The following example sends rest requests to some endpoint
    # response is a response object in python requests library
    response = helper.send_http_request("http://www.splunk.com", "GET", parameters=None,
                                        payload=None, headers=None, cookies=None, verify=True, cert=None, timeout=None, use_proxy=True)
    # get the response headers
    r_headers = response.headers
    # get the response body as text
    r_text = response.text
    # get response body as json. If the body text is not a json string, raise a ValueError
    r_json = response.json()
    # get response cookies
    r_cookies = response.cookies
    # get redirect history
    historical_responses = response.history
    # get response status code
    r_status = response.status_code
    # check the response status, if the status is not sucessful, raise requests.HTTPError
    response.raise_for_status()


    # The following example gets and sets the log level
    helper.set_log_level(helper.log_level)

    # The following example gets the setup parameters and prints them to the log
    email = helper.get_global_setting("email")
    helper.log_info("email={}".format(email))
    password = helper.get_global_setting("password")
    helper.log_info("password={}".format(password))
    corp = helper.get_global_setting("corp")
    helper.log_info("corp={}".format(corp))

    # The following example gets the alert action parameters and prints them to the log
    site = helper.get_param("site")
    helper.log_info("site={}".format(site))

    ip = helper.get_param("ip")
    helper.log_info("ip={}".format(ip))


    # The following example adds two sample events ("hello", "world")
    # and writes them to Splunk
    # NOTE: Call helper.writeevents() only once after all events
    # have been added
    helper.addevent("hello", sourcetype="sigsci-request")
    helper.addevent("world", sourcetype="sigsci-request")
    helper.writeevents(index="summary", host="localhost", source="localhost")

    # The following example gets the events that trigger the alert
    events = helper.get_events()
    for event in events:
        helper.log_info("event={}".format(event))

    # helper.settings is a dict that includes environment configuration
    # Example usage: helper.settings["server_uri"]
    helper.log_info("server_uri={}".format(helper.settings["server_uri"]))
    [sample_code_macro:end]
    """

    helper.log_info("Alert action CreateBlacklist started.")

    # TODO: Implement your alert action logic here

    api_host = 'https://dashboard.signalsciences.net'
    # The following example gets the setup parameters and prints them to the log
    site_name = helper.get_param("site")
    helper.log_info("site={}".format(site_name))

    # The following example gets the alert action parameters and prints them to the log
    email = helper.get_global_setting("email")
    helper.log_info("email={}".format(email))

    password = helper.get_global_setting("password")

    corp_name = helper.get_global_setting("corp")
    helper.log_info("corp={}".format(corp_name))

    blacklistIp = helper.get_param("ip")
    helper.log_info("ip={}".format(blacklistIp))


    # Authenticate

    authEndpoint = api_host + '/api/v0/auth'
    auth = requests.post(
        authEndpoint,
        data = {"email": email, "password": password}
    )

    authCode = auth.status_code
    authError = auth.text

    if authCode != 200:
        helper.log_info("Authorization failed. Status=%s Message=%s" % (authCode, authError))
    
    else:

        parsed_response = auth.json()
        token = parsed_response['token']
    
        headers = {
            'Content-type': 'application/json',
            'Authorization': 'Bearer %s' % token
        }
    
        #API Endpoints
        urlBlack = api_host + ('/api/v0/corps/%s/sites/%s/blacklist' % (corp_name, site_name))
    
        jsonLine = "{\"source\": \"%s\", \"expires\": \"\", \"note\":\"IP from Splunk Block\"}"  % (blacklistIp)
    
        helper.log_info(jsonLine)
        helper.log_info("Importing Blacklist IP: %s" % blacklistIp)
        payload = jsonLine
        url = urlBlack
    
        response_raw = requests.post(url, headers=headers, data=payload)
        responseCode = response_raw.status_code
        responseError = response_raw.text
    
        if responseCode != 200 and responseCode != 201:
            helper.log_info("Adding blacklist entry failed. Status=%s Message=%s" % (responseCode, responseError))
        else:
            helper.log_info("Alert action CreateBlacklist finished.")
        

    return 0