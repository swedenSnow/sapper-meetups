<script>
    import { createEventDispatcher } from 'svelte';
    import meetupsStore from '../../meetups-store.js';
    import TextInput from '../UI/TextInput.svelte';
    import Button from '../UI/Button.svelte';
    import Modal from '../UI/Modal.svelte';
    //! Helpers
    import {
        isEmpty,
        isValidEmail,
        isValidUrl,
    } from '../../helpers/validation.js';

    let title = '';
    // let titleValid = false; SVelte does create these for you!!!
    let subtitle = '';
    // let subtitleValid = false;
    let address = '';
    // let addressValid = false;
    let email = '';
    // let emailValid = false;
    let description = '';
    // let descriptionValid = false;
    let imageUrl = '';
    // let imageUrlValid = false;

    let error;

    export let id = null;

    if (id) {
        const unsubscribe = meetupsStore.subscribe(items => {
            const selectedMeetup = items.find(item => item.id === id);
            title = selectedMeetup.title;
            subtitle = selectedMeetup.subtitle;
            address = selectedMeetup.address;
            email = selectedMeetup.contactEmail;
            description = selectedMeetup.description;
            imageUrl = selectedMeetup.imageUrl;
        });

        unsubscribe();
    }

    let formIsValid = false;

    const dispatch = createEventDispatcher();

    $: titleValid = !isEmpty(title);
    $: subtitleValid = !isEmpty(subtitle);
    $: addressValid = !isEmpty(address);
    $: descriptionValid = !isEmpty(description);
    $: imageUrlValid = isValidUrl(imageUrl);
    $: emailValid = isValidEmail(email);
    $: formIsValid =
        titleValid &&
        subtitleValid &&
        addressValid &&
        descriptionValid &&
        imageUrlValid &&
        emailValid;

    function submitForm() {
        // const e = event.detail;
        // console.table(event.detail);
        const meetupData = {
            title: title,
            subtitle: subtitle,
            description: description,
            imageUrl: imageUrl,
            contactEmail: email,
            address: address,
        };

        // meetups.push(newMeetup); // DOES NOT WORK!
        if (id) {
            fetch(
                `https://svelte-course-6d25d.firebaseio.com/meetups/${id}.json`,
                {
                    method: 'PATCH',
                    body: JSON.stringify(meetupData),
                    headers: { 'Content-Type': 'application/json' },
                }
            )
                .then(res => {
                    if (!res.ok || res.status !== 200) {
                        throw new Error(`Epic Fail! 😒 ${res.status}`);
                    }
                    meetupsStore.updateMeetup(id, meetupData);
                })
                .catch(err => {
                    error = err;
                    console.log(err);
                });
        } else {
            fetch('https://svelte-course-6d25d.firebaseio.com/meetups.json', {
                method: 'POST',
                body: JSON.stringify({ ...meetupData, isFavorite: false }),
                headers: { 'Content-Type': 'application/json' },
            })
                .then(res => {
                    if (!res.ok || res.status !== 200) {
                        throw new Error('Epic Fail! 😒');
                    }
                    return res.json();
                })
                .then(data => {
                    meetupsStore.addMeetup({
                        ...meetupData,
                        isFavorite: false,
                        id: data.name,
                    });
                })
                .catch(err => {
                    error = err;
                    console.log(err);
                });
        }

        dispatch('save');
    }

    function cancel() {
        dispatch('cancel');
    }

    function removeMeetup() {
        fetch(`https://svelte-course-6d25d.firebaseio.com/meetups/${id}.json`, {
            method: 'DELETE',
        })
            .then(res => {
                if (!res.ok || res.status !== 200) {
                    throw new Error(`Epic Fail! 😒 ${res.status}`);
                }
                meetupsStore.removeMeetup(id);
            })
            .catch(err => console.log(err));
        dispatch('save');
    }
</script>

<style>
    form {
        max-width: 100%;
    }
</style>

<Modal title="Edit Meetup Data" on:cancel>
    <form on:submit|preventDefault={submitForm}>
        <TextInput
            id="title"
            label="Title"
            valid={titleValid}
            errorMsg="Please enter a valid title"
            value={title}
            on:input={event => (title = event.target.value)} />
        <TextInput
            id="subtitle"
            label="Subtitle"
            valid={subtitleValid}
            errorMsg="Please enter a valid subtitle"
            value={subtitle}
            on:input={event => (subtitle = event.target.value)} />
        <TextInput
            id="address"
            label="Address"
            valid={addressValid}
            errorMsg="Please enter a valid address"
            value={address}
            on:input={event => (address = event.target.value)} />
        <TextInput
            id="imageUrl"
            label="Image URL"
            value={imageUrl}
            valid={imageUrlValid}
            errorMsg="Please enter a valid URL"
            on:input={event => (imageUrl = event.target.value)} />
        <TextInput
            id="email"
            label="E-Mail"
            type="email"
            valid={emailValid}
            errorMsg="Please enter a valid email"
            value={email}
            on:input={event => (email = event.target.value)} />
        <TextInput
            id="description"
            label="Description"
            controlType="textarea"
            valid={descriptionValid}
            errorMsg="Please enter a valid description"
            bind:value={description} />
    </form>
    <div slot="footer">
        <Button type="button" mode="outline" on:click={cancel}>Cancel</Button>
        <Button type="button" on:click={submitForm} disabled={!formIsValid}>
            Save
        </Button>
        {#if id}
            <Button type="button" on:click={removeMeetup}>Delete</Button>
        {/if}
    </div>
</Modal>
