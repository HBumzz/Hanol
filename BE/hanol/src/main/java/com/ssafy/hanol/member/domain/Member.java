package com.ssafy.hanol.member.domain;

import com.ssafy.hanol.common.model.BaseTimeEntity;
import com.ssafy.hanol.member.service.dto.MemberSignUpRequest;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Table(name = "member",
        uniqueConstraints = {
                @UniqueConstraint(
                        name = "unique_oauth_member",
                        columnNames = {"oauth_provider","oauth_id"}
                )
        }
)
public class Member extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_id")
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String email;

    @Column(nullable = true)
    private Gender gender;

    @Column(nullable = true)
    private LocalDate birth;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, name = "oauth_provider")
    private OauthProvider oauthProvider;

    @Embedded
    private OauthId oauthId = new OauthId();

    @Column(nullable = false)
    private Role role;

    @Column(name = "last_login_date")
    private LocalDateTime lastLoginDate;

    @Builder
    public Member(String name, String email, Gender gender, LocalDate birth, OauthProvider oauthProvider,
                  OauthId oauthId, Role role, LocalDateTime lastLoginDate) {
        this.name = name;
        this.email = email;
        this.gender = gender;
        this.birth = birth;
        this.oauthProvider = oauthProvider;
        this.oauthId = oauthId;
        this.role = role;
        this.lastLoginDate = lastLoginDate;
    }

    public void updateLastLoginDate() {
        this.lastLoginDate = LocalDateTime.now();
    }

    public void updateMemberGenderAndBirth(MemberSignUpRequest memberSignUpRequest) {
        this.gender = memberSignUpRequest.getGender();
        this.birth = memberSignUpRequest.getBirth();
    }

    public void updateMemberRole(Role role) {
        this.role = role;
    }
}
