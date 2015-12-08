require 'sinatra'
require 'sinatra/cross_origin'
require 'securerandom'
require 'json'

configure do
  enable :cross_origin
end

COOKIE_NAME = '_server.cookie'

post '/cookie' do
  response.set_cookie(COOKIE_NAME, cookie_data)
  cookie_data
end

def cookie_data
  @cookie ||= request.cookies[COOKIE_NAME] || create_cookie
end

def create_cookie
  JSON.dump({ id: SecureRandom.uuid, creation_time: Time.now.to_s })
end
