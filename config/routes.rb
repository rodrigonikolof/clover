Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :users, only: [:create, :update]
      post '/login', to: 'auth#create'
      get '/profile', to: 'users#profile'
      
      resources :clients, only: [:index, :create, :show, :update, :destroy]
      resources :interventions, only: [:index, :update, :destroy, :create]
      resources :goals, only: [:index, :show, :update, :create]
      resources :goal_intervention, only: [:show, :create, :destroy, :update]

     
      post 'password/reset/edit', to: "password_resets#create"
      
      post 'password/reset/update', to: "password_resets#update"


    end
  end

 
  
end
