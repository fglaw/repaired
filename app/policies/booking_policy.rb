class BookingPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      scope.all
    end
  end

  def index?
    return true
  end

  def show?
    return true
  end

  def create?
    !user.user_mechanic
  end

  def update?
    return true
  end

  def new?
    true
  end
end
