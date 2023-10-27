from rest_framework import serializers
from user.models import User


class UserSerializer(serializers.ModelSerializer):

    password = serializers.CharField(write_only=True)

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password'],
        )

        return user

    class Meta:
        model = User
        fields = ("id", "username", "password", )
