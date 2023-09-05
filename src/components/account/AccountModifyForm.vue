<template>
    <div class="account-modify-card">
        <v-form @submitAccountInfo.prevent="onSubmit" ref="form">
            <h2 class="account-modify-title">회원 정보</h2>
            <div class="account-modify-bigbox">
                <ul class="account-modify-table">
                    <li>
                        <dl>
                            <div>
                                <dd class="profile-image-container">
                                    <div @click="clickInput" class="profile-image-circle">
                                        <input ref="file" type="file" id="modify-image" style="display: none"
                                            @change="handleFileUpload" />
                                        <v-img v-if="!imagePreview" :src="getProfileImage(account.profileImageName)"
                                            width="100" height="100"></v-img>
                                        <v-img v-else :src=imagePreview class='preview-image' width='100'
                                            height='100'></v-img>
                                        <v-icon class='profile-image-icon'>mdi-pencil-circle-outline</v-icon>
                                    </div>
                                <dd class="delete-image-button">
                                    <button v-if=isChangeImage @click.prevent.stop="deleteImage">
                                        기본 이미지로 변경
                                    </button>
                                </dd>
                                </dd>
                            </div>

                        </dl>
                        <dl>
                            <dt>이메일</dt>
                            <div style="color: rgb(157, 155, 155);">
                                <dd id="email">{{ account.email }}</dd>
                            </div>
                        </dl>
                        <dl>
                            <dt>닉네임</dt>
                            <div style=" margin-bottom: 10px;">

                                <dd v-if="!isChangeNickname" @click="startEditNickname">
                                    {{ account.nickname }}
                                    <v-icon style="font-size:14px; left: 5px; bottom: 2px;">mdi-pencil</v-icon>

                                </dd>
                                <dd v-else>

                                    <input ref="nicknameInput" v-model="newNickname" type="text" style="color: white;" />

                                    <div>
                                        <v-btn class="account-modify-button" style="height: 23px;" @click="checkNickname()">
                                            중복확인
                                        </v-btn>
                                        <v-btn class="account-cancel-button" style="height: 23px;"
                                            @click="cancelChangeNickname">
                                            취소
                                        </v-btn>
                                    </div>
                                </dd>
                            </div>
                        </dl>
                        <div v-if="isChangeImage || isChangeNickname">
                            <v-btn class="account-save-button" @click="submitAccountInfo()">
                                저장하기
                            </v-btn>
                        </div>
                    </li>
                </ul>
                <div>
                    <dd class="withdrawal-letter">회원을 탈퇴하시겠어요?</dd>
                    <button class="withdrawal-button" @click="withdrawSubmit">회원탈퇴</button>
                </div>
            </div>
        </v-form>
    </div>
</template>
<script>
import { mapActions } from "vuex";
import AWS from 'aws-sdk'

const accountModule = "accountModule";

export default {
    props: {
        account: {
            type: Object,
            required: true,
        },
    },

    data() {
        return {
            isEditMode: false,
            nickname: '',
            newNickname: '',

            imagePreview: null,
            newProfileImageName: null,

            isChangeImage: false,
            isChangeNickname: false,
            isNicknamecheck: false,

            file: null,
            s3fileList: [],
            awsBucketName: process.env.VUE_APP_AWS_BUCKET_NAME,
            awsBucketRegion: process.env.VUE_APP_AWS_BUCKET_REGION,
            awsIdentityPoolId: process.env.VUE_APP_AWS_IDENTITY_POOLID,
            s3: null,
        }
    },

    methods: {
        ...mapActions(accountModule, ["requestCheckNicknameToSpring"]),
        getProfileImage(profileImageName) {
            if (this.imagePreview) {
                return this.imagePreview;
            } else if (!profileImageName) {
                return require('@/assets/images/Logo_only_small-removebg-preview.png');
            } else {
                return `https://${this.awsBucketName}.s3.${this.awsBucketRegion}.amazonaws.com/${profileImageName}`;
            }
        },

        handleFileUpload() {
            this.newProfileImageName = this.account.profileImageName;

            if (this.$refs.file) {
                const file = this.$refs.file.files[0];

                if (file) {
                    const reader = new FileReader();

                    reader.onload = (e) => {
                        this.imagePreview = e.target.result;
                        this.newProfileImageName = file.name;
                        this.isChangeImage = true;
                        this.file = file;
                    };

                    reader.readAsDataURL(file);
                }
            }
        },

        isImageChanged() {
            return this.newProfileImageName !== this.account.profileImageName;
        },

        clickInput() {
            this.$refs.file.click();
        },

        async submitAccountInfo() {
            if (this.isChangeNickname && !this.isNicknamecheck) {
                alert('닉네임 중복체크를 진행해주세요!');
                return;
            }

            const newProfileImageName = this.newProfileImageName || this.account.profileImageName;
            const newNickname = this.newNickname || this.account.nickname;
            if (newProfileImageName !== null) {
                this.$emit("submitAccountInfo", { newNickname, newProfileImageName });
                if (this.file) {
                    this.uploadAwsS3();
                }

            } else {
                this.$emit("submitAccountInfo", { newNickname, newProfileImageName: "" });
            }
            this.account.nickname = newNickname;

            this.isChangeImage = false;
            this.isChangeNickname = false;
        },

        startEditNickname() {
            this.isChangeNickname = true;
            this.newNickname = this.account.nickname;
            this.$nextTick(() => {
                this.$refs.nicknameInput.focus();
            });
        },

        async checkNickname() {
            this.isNicknamecheck = await this.requestCheckNicknameToSpring({ newNickname: this.newNickname })
        },

        cancelChangeNickname() {
            this.isChangeNickname = false
            this.isNicknamecheck = false;
            this.newNickname = this.account.nickname;
        },

        deleteImage() {
            this.imagePreview = null;
            this.file = null;
            this.newProfileImageName = null;
            this.account.profileImageName = null;
        },

        awsS3Config() {
            AWS.config.update({
                region: this.awsBucketRegion,
                credentials: new AWS.CognitoIdentityCredentials({
                    IdentityPoolId: this.awsIdentityPoolId
                })
            });

            this.s3 = new AWS.S3({
                apiVersion: '2006-03-01',
                params: {
                    Bucket: this.awsBucketName
                }
            });
        },

        uploadAwsS3() {
            this.awsS3Config()

            let files = Array.isArray(this.file) ? this.file : [this.file];
            for (let idx = 0; idx < files.length; idx++) {
                const file = files[idx];

                if (!file || !file.name) {
                    this.profileImageName = this.account.profileImageName;
                }
                this.newProfileImageName = file.name;

                this.s3.upload({
                    Key: file.name,
                    Body: file,
                    ACL: 'public-read'
                }, (err, data) => {
                    if (err) {
                        console.log(err)
                        return alert('업로드 중 문제 발생 (사진 파일에 문제가 있음)', err.message)
                    }

                    this.newProfileImageName = data.Location;
                    this.imagePreview = data.Location;
                })
            }
        },

        async withdrawSubmit() {
            this.$emit("withdrawAccount")
            if (this.file) {
                this.deleteAwsS3();
            }
        },

        async deleteAwsS3() {
            if (this.account.profileImageName) {
                this.awsS3Config();

                this.s3.deleteObject({
                    Bucket: this.awsBucketName,
                    Key: this.account.profileImageName
                }, (err, data) => {
                    if (err) {
                        console.log(err);
                        alert('프로필 이미지 삭제 중 문제 발생', err.message);
                    } else {
                        console.log('프로필 이미지 삭제 완료');
                    }
                });
            }
        }
    }
}
</script>
<style>
.account-modify-card {
    margin-top: 6rem;
    padding: 18px;
    width: 900px;
    background-color: rgba(0, 0, 0, 0.4) !important;
    color: white;
}

.account-modify-bigbox {
    display: block;
    padding: 24px 20px 20px 20px;
    box-sizing: border-box;
}

.account-modify-bigbox div {
    box-sizing: border-box;
    display: block;
}

.account-modify-bigbox .account-modify-table li dl {
    display: table;
    table-layout: fixed;
    width: 100%;
    padding-bottom: 16px;
}

.account-modify-bigbox .account-modify-table li dl dt {
    display: table-cell;
    width: 100px;
    padding-right: 10px;
    box-sizing: border-box;
    line-height: 1.37;
    word-break: keep-all;
}

.account-modify-bigbox .account-modify-table li dl dd,
.edit2_form_list2 li dl dd {
    display: table-cell;
}

.account-modify-table {
    border-bottom: 1px solid rgb(146, 134, 134);
    padding: 0 20px 30px 0;
    display: block;
    margin-top: 35px;
}

.account-modify-title {
    position: relative;
    font-size: 18px;
    font-weight: 700;
    line-height: 1.44;
    letter-spacing: -.8px;
    display: block;
}

.edit2_form_list_button {
    width: 20%;
    text-align: right;
}

.edit2_form_list_button>a {
    width: 54px;
    background-color: #ededed;
    color: #333;
    height: 30px;
    padding: 5px 16px;
    box-sizing: border-box;
    border-radius: 18px;
    font-size: 13px;
    font-weight: 700;
    text-align: center;
    line-height: 30px;
    letter-spacing: -.5px;
    outline: none;
}

.edit2_form_list_button>a:hover {
    cursor: pointer;
}

.withdrawal-letter {
    min-width: auto;
    font-size: 13px;
    color: gray;
    margin-top: 10px;
}

.withdrawal-button {
    min-width: auto;
    font-size: 12px;
    color: gray;
    margin-top: -20px;
    float: right;
}

.image-container {
    position: relative;
    display: inline-block;
}

.profile-image-container {
    display: flex;
    align-items: center;
    position: relative;
}

.profile-image-circle {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    overflow: hidden;
    margin-right: 10px;
    cursor: pointer;
    border: 2px solid white;
}

.profile-image-circle v-img {
    object-fit: cover;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
}

.profile-image-icon {
    background-color: black;
    position: absolute;
    display: flex;
    padding: 5px;
    border-radius: 50%;
    cursor: pointer;
    margin-right: 15px;
    z-index: 2;
    right: 0;
    bottom: 0;
    color: white;
    font-size: 25px;
}

.account-modify-button,
.account-cancel-button {
    background-color: rgba(0, 0, 0, 0.4) !important;
    font-size: 12px;
    width: 20px;
    margin-left: 10px;
}

.account-save-button {
    background-color: rgba(0, 0, 0, 0.4) !important;
}

.delete-image-button {
    position: absolute;
    display: flex;
    color: #ccff00;
    font-size: small;
    margin-left: 100px;
    margin-right: -150px;
    margin-top: -20px;
    margin-bottom: 20px;
}
</style>